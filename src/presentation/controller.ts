import {
  Controller,
  HttpResponse,
  ok,
  serverError,
} from '@/presentation/contracts'

interface Params {
  mapRequest?: Function
  useCase: any
  mapResponse?: Function
  responseFieldToMap?: string
}

export class GenericController implements Controller {
  private readonly mapRequest?: Function
  private readonly useCase: any
  private readonly mapResponse?: Function
  private readonly responseFieldToMap?: string

  constructor(params: Params) {
    this.mapRequest = params.mapRequest
    this.useCase = params.useCase
    this.mapResponse = params.mapResponse
    this.responseFieldToMap = params.responseFieldToMap
  }

  async handle(functionName: string, requestParams: any): Promise<HttpResponse<any>> {
    try {
      if (this.mapRequest) {
        requestParams = this.mapRequest(requestParams)
      }

      // eslint-disable-next-line security/detect-object-injection
      let response: any = await this.useCase[functionName](requestParams)

      if (this.mapResponse && this.responseFieldToMap) {
        response[this.responseFieldToMap] = this.mapResponse(response[this.responseFieldToMap])
      } else if (this.mapResponse) {
        response = this.mapResponse(response)
      }

      return ok(response)
    } catch (error) {
      return serverError(error)
    }
  }
}
