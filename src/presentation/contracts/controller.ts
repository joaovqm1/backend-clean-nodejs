import { HttpResponse } from './http'

export interface Controller {
  handle: (funcitionName?: string, request?: any) => Promise<HttpResponse>
}
