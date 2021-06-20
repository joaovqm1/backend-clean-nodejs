import { ReadCrudRequestDTO } from '@/domain'
interface Params {
  request: any
  fieldsToInclude?: string[]
}

export function fromAnyReadRequestToReadRequestDTO(params: Params): ReadCrudRequestDTO {
  const readRequest: ReadCrudRequestDTO = {}

  if (params.fieldsToInclude) {
    readRequest.fieldsToInclude = params.fieldsToInclude
  }

  readRequest.filters = []

  for (const field in params.request) {
    const newFilter = {
      equalTo: {}
    }
    // eslint-disable-next-line security/detect-object-injection
    newFilter.equalTo[field] = params.request[field]
    readRequest.filters.push(newFilter)
  }

  return readRequest
}
