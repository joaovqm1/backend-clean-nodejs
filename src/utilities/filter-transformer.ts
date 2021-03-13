/* eslint-disable max-depth */
import { FilterTransformer, Filter, FilterBuilder } from '@/data'
import {
  ReadCrudFilter,
  ReadCrudRequestDTO,
} from '@/domain/features/crud/read/request-dto'
export class FilterTransformerImpl implements FilterTransformer {
  transformQueryToFilters(query: ReadCrudRequestDTO): Filter[] {
    let filterBuilder = new FilterBuilder()
    for (const field in query) {
      switch (field) {
        case 'fieldsToSelect': {
          filterBuilder.selectAndInclude(query[field])
          break
        }
        case 'fieldsToInclude': {
          filterBuilder.include(query[field])
          break
        }
        case 'page': {
          filterBuilder.offset(query[field])
          break
        }
        case 'size': {
          filterBuilder.limit(query[field])
          break
        }
        case 'filters': {
          const filters: ReadCrudFilter[] = query[field]
          filterBuilder = this.addFiltersToFilterBuilder(filters, filterBuilder)
        }
      }
    }

    return filterBuilder.build()
  }


  addFiltersToFilterBuilder(filters: ReadCrudFilter[], filterBuilder: FilterBuilder): FilterBuilder {
    for (const filter of filters) {
      if (filter.exists) {
        filterBuilder.exists(filter.exists)
      } else {
        const name = Object.keys(filter)[0]
        const field = Object.keys(filter[name])[0]
        const value = filter[name][Object.keys(filter[name])[0]]
        filterBuilder[name](field, value)
      }
    }
    return filterBuilder
  }
}
