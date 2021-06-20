import { basename } from 'path'
import sinon from 'sinon'

import { storageConfig } from '@/config'
import { fileUtilities } from '@/main'
import { AWSS3Impl, S3Adapter } from '@/third-party'

describe('S3 Storage', function() {
  const mockS3Adapter: S3Adapter = {
    upload: jest.fn(),
    deleteObject: jest.fn()
  }

  const storage = new AWSS3Impl({
    fileUtilities,
    s3: mockS3Adapter
  })

  it('Should upload file with key extension', async function() {
    // Arrange
    const mockStream = 'stream'
    sinon.stub(fileUtilities, 'getReadStream').withArgs('path.pdf').returns(mockStream)

    const mockData = {
      Location: 'location'
    }

    const mockParams = {
      ACL: 'public-read',
      Bucket: storageConfig.awsS3BucketName,
      Key: 'key.pdf',
      Body: mockStream
    }

    sinon.stub(mockS3Adapter, 'upload').withArgs(mockParams).resolves(mockData.Location)

    // Act 
    const receivedResult = await storage.upload({ path: 'path.pdf', key: 'key' })

    // Assert 
    const expectedResult = mockData.Location
    expect(receivedResult).toEqual(expectedResult)
  })

  it('Should upload file without key extension', async function() {
    // Arrange
    const mockStream = 'stream'
    sinon.stub(fileUtilities, 'getReadStream').withArgs('path.pdf').returns(mockStream)

    const mockData = {
      Location: 'location'
    }

    const mockParams = {
      ACL: 'public-read',
      Bucket: storageConfig.awsS3BucketName,
      Key: 'key.pdf',
      Body: mockStream
    }

    sinon.stub(mockS3Adapter, 'upload').withArgs(mockParams).resolves(mockData.Location)

    // Act 
    const receivedResult = await storage.upload({ path: 'path.pdf', key: 'key' })

    // Assert 
    const expectedResult = mockData.Location
    expect(receivedResult).toEqual(expectedResult)
  })

  it('Should return basename from path', function() {
    // Act
    const receivedKey = storage.getKey('path')

    // Assert
    const expectedKey = basename('path')
    expect(receivedKey).toEqual(expectedKey)
  })

  it('Should return temp bucket name', function() {
    // Arrange

    // Act
    const receivedBucket = storage.getBucketName(true)

    // Assert
    const expectedBucketName = storageConfig.awsS3TempBucketName
    expect(receivedBucket).toEqual(expectedBucketName)
  })

  it('Should return error if file uploads fail', async function() {
    // Arrange
    const mockStream = 'stream'
    sinon.stub(fileUtilities, 'getReadStream').withArgs('path.pdf').returns(mockStream)

    const mockParams = {
      ACL: 'public-read',
      Bucket: storageConfig.awsS3BucketName,
      Key: 'key.pdf',
      Body: mockStream
    }

    sinon.stub(mockS3Adapter, 'upload').withArgs(mockParams).rejects(new Error('Não foi possível fazer o upload do arquivo'))

    // Act and Assert 
    await expect(async function() { await storage.upload({ path: 'path.pdf', key: 'key' }) })
      .rejects
      .toThrowError('Não foi possível fazer o upload do arquivo')
  })

  it('Should remove file', async function() {
    // Arrange
    const mockParams = {
      Bucket: storageConfig.awsS3BucketName,
      Key: 'key',
    }

    sinon.stub(mockS3Adapter, 'deleteObject').withArgs(mockParams).resolves('Ok')

    // Act 
    const receivedResult = await storage.remove('key')

    // Assert 
    const expectedResult = 'Ok'
    expect(receivedResult).toEqual(expectedResult)
  })
})

afterEach(() => sinon.restore())
