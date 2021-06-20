/* eslint-disable security/detect-object-injection */
import { FilterBuilder } from '@/data'
import { Filter } from '@/domain'

interface Params {
  request: any
  fieldsAndFilters: { [field: string]: string }
  fieldsToInclude?: string[]
}

export function transformRequestToFilters(params: Params): Filter[] {
  const { request, fieldsAndFilters, fieldsToInclude } = params

  fieldsAndFilters.id = 'equalTo'

  let filterBuilder = new FilterBuilder()

  for (const field in fieldsAndFilters) {
    const value = request[field]
    if (value) {
      const filter = fieldsAndFilters[field]
      filterBuilder = filterBuilder[filter](field, value)
    }
  }

  if (fieldsToInclude) {
    filterBuilder = filterBuilder.include(fieldsToInclude)
  }

  return filterBuilder.build()
}