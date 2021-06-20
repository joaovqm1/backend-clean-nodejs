require('./loader')

export const storageConfig = {
  awsS3BucketName: process.env.AWS_S3_BUCKET_NAME,
  awsS3TempBucketName: process.env.AWS_S3_TEMP_BUCKET_NAME
}
