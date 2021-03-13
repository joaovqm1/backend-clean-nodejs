export interface ReadCrudRequestDTO {
  fieldsToSelect?: string[]
  fieldsToInclude?: string[]
  page?: number
  size?: number
  filters?: ReadCrudFilter[]
}

export interface ReadCrudFilter {
  equalTo?: AnyFilter
  contains?: AnyFilter
  exists?: string
  greaterThan?: string
  greaterThanOrEqualTo?: string
  lessThan?: string
  lessThanOrEqualTo?: string
}

interface AnyFilter {
  [field: string]: any
}
