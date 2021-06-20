import { basename } from 'path'

import { storageConfig } from '@/config'
import { FileUtilities, Storage } from '@/data'

export interface S3Adapter {
  upload: (params: {
    ACL: string
    Bucket: string
    Key: string
    Body: any
  }) => Promise<string>
  deleteObject: (params: {
    Bucket: string
    Key: string
  }) => Promise<string>
}

interface Params {
  s3: S3Adapter
  fileUtilities: FileUtilities
  useTempBucket?: boolean
}

export class AWSS3Impl implements Storage {
  private readonly fileUtilities: FileUtilities
  private readonly useTempBucket?: boolean
  private readonly s3: S3Adapter

  constructor(params: Params) {
    this.fileUtilities = params.fileUtilities
    this.s3 = params.s3
    this.useTempBucket = params.useTempBucket
  }

  async upload(params: { path: string, key?: string, tempFile?: boolean }): Promise<string> {
    const { path, tempFile } = params
    let { key } = params

    if (!key?.includes('.')) {
      const split = path.split('.')
      key = `${key}.${split[split.length - 1]}`
    }

    const s3Params = {
      ACL: 'public-read',
      Bucket: this.getBucketName(tempFile),
      Key: this.getKey(path, key),
      Body: this.fileUtilities.getReadStream(path)
    }

    const link = await this.s3.upload(s3Params)

    this.fileUtilities.remove(path)

    return link
  }

  getKey(path: string, key?: string): string {
    return (key || basename(path)).toLowerCase()
  }

  getBucketName(tempFile?: boolean): string {
    if (this.useTempBucket || tempFile) {
      return storageConfig.awsS3TempBucketName
    } else {
      return storageConfig.awsS3BucketName
    }
  }

  async remove(key: string): Promise<string> {
    const params = {
      Bucket: storageConfig.awsS3BucketName,
      Key: key
    }

    return this.s3.deleteObject(params)
  }
}
