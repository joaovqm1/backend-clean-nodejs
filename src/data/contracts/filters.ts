export interface Filter {
  name: string
  fields?: string[]
  field?: string
  values?: any[]
  value?: any
}

export interface FilterTransformer {
  transformQueryToFilters: (query: any) => Filter[]
}
