import S3 from 'aws-sdk/clients/s3'

import { enviromentConfig } from '@/config'
import { EmailSender, Storage } from '@/data'
import { AWSS3Impl, AWSSESImpl, NodeMailerImpl, S3Adapter } from '@/third-party'

import { fileUtilities } from './utilities'

export function getStorage(): Storage {
  const params = {
    fileUtilities,
    s3: new S3AdapterImpl()
  }
  if (enviromentConfig.isProductionEnvironment()) {
    return new AWSS3Impl(params)
  } else {
    return new AWSS3Impl({ ...params, useTempBucket: true })
  }
}

class S3AdapterImpl implements S3Adapter {
  private readonly s3 = new S3()

  async upload(params: { ACL: string, Bucket: string, Key: string, Body: any }): Promise<string> {
    return new Promise((resolve, reject) => {
      this.s3.upload(params, function(error: Error, data: any) {
        if (error) {
          return reject(new Error('Não foi possível fazer o upload do arquivo'))
        } else {
          return resolve(data.Location)
        }
      })
    })
  }

  async deleteObject(params: { Bucket: string, Key: string }): Promise<string> {
    return new Promise((resolve, reject) => {
      this.s3.deleteObject(params, function(error: Error) {
        if (error) {
          return reject(new Error('Erro ao remover um arquivo'))
        } else {
          return resolve('Arquivo removido com sucesso')
        }
      })
    })
  }
}

export function getEmailSender(
  isProductionEnviroment: boolean = enviromentConfig.isProductionEnvironment()
): EmailSender {
  if (isProductionEnviroment) {
    return new AWSSESImpl()
  } else {
    return new NodeMailerImpl()
  }
}
