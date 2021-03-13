import { UserIdentification } from '@/data'

export interface RequestParams extends UserIdentification {
  feature: string
  operation: string
  userId?: number
}

export interface RequestParamsWithUser extends RequestParams {
  userId?: number
}
