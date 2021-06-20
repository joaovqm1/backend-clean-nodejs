export interface UploadFileRequestDTO {
  filename: string
  originalname: string
  mimetype: string
  size: number
  path: string
  description: string
}

export interface UploadFileResonseDTO {
  name: string
  key: string
  path: string
  extension: string
  mimeType: string
  size: number
  description: string
}

export interface UploadFile {
  upload: (request: UploadFileRequestDTO) => Promise<UploadFileResonseDTO>
}
