import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'

import {
  DeleteParams,
  GetParams,
  HttpRequest,
  PostPutParams,
} from '@/data/contracts'

export class HttpRequestImpl implements HttpRequest {
  private readonly axiosInstance: AxiosInstance
  constructor(
    private readonly baseURL: string,
    private readonly timeout: number = 50000
  ) {
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      timeout: this.timeout,
    })
  }

  async post(params: PostPutParams): Promise<any> {
    const axiosParams: AxiosRequestConfig = {
      data: params.body,
      method: 'post',
      headers: params.headers,
      url: params.url,
    }
    return this.send(axiosParams)
  }

  /* istanbul ignore next */
  async send(params: AxiosRequestConfig): Promise<any> {
    try {
      const result = await this.axiosInstance(params)
      return result.data
    } catch (error) {
      throw new Error(this.getErrorMessage(error))
    }
  }

  getErrorMessage(error: AxiosError): string {
    return error.response?.data ? error.response.data : error.message
  }

  async put(params: PostPutParams): Promise<any> {
    const axiosParams: AxiosRequestConfig = {
      data: params.body,
      method: 'put',
      headers: params.headers,
      url: params.url,
    }
    return this.send(axiosParams)
  }

  async get(params: GetParams): Promise<any> {
    const axiosParams: AxiosRequestConfig = {
      params: params.query,
      method: 'get',
      headers: params.headers,
      url: params.url,
    }
    return this.send(axiosParams)
  }

  async delete(params: DeleteParams): Promise<any> {
    const axiosParams: AxiosRequestConfig = {
      method: 'delete',
      headers: params.headers,
      url: params.url,
    }
    return this.send(axiosParams)
  }
}
