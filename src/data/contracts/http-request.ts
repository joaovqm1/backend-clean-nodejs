export interface PostPutParams {
  url: string
  body: any
  headers?: any
}

export interface GetParams {
  url: string
  query?: any
  headers?: any
}

export interface DeleteParams {
  url: string
  headers?: any
}

export interface HttpRequest {
  post: (params: PostPutParams) => Promise<any>
  put: (params: PostPutParams) => Promise<any>
  get: (params: GetParams) => Promise<any>
  delete: (params: DeleteParams) => Promise<any>
}
