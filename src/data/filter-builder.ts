import { Filter } from '@/domain'

export class FilterBuilder {
  private readonly filters: Filter[] = []

  equalTo(field: string, value: any): FilterBuilder {
    this.filters.push(this.getFilter('equalTo', field, value))
    return this
  }

  private getFilter(
    name: string,
    fieldOrFields: string | string[],
    valueOrValues?: any | any[]
  ): Filter {
    const filter: Filter = {
      name: name,
    }

    if (Array.isArray(fieldOrFields)) {
      filter.fields = fieldOrFields
    } else {
      filter.field = fieldOrFields
    }

    if (Array.isArray(valueOrValues)) {
      filter.values = valueOrValues
    } else if (valueOrValues !== undefined) {
      filter.value = valueOrValues
    }

    return filter
  }

  selectAndInclude(fields: string[]): FilterBuilder {
    this.filters.push(this.getFilter('selectAndInclude', fields))
    return this
  }

  select(fields: string[]): FilterBuilder {
    this.filters.push(this.getFilter('select', fields))
    return this
  }

  include(fields: string[]): FilterBuilder {
    this.filters.push(this.getFilter('include', fields))
    return this
  }

  offset(number: number): FilterBuilder {
    this.filters.push(this.getFilter('offset', undefined, number))
    return this
  }

  limit(number: number): FilterBuilder {
    this.filters.push(this.getFilter('limit', undefined, number))
    return this
  }

  exists(field: string): FilterBuilder {
    this.filters.push(this.getFilter('exists', field))
    return this
  }

  greaterThan(field: string, value: any): FilterBuilder {
    this.filters.push(this.getFilter('greaterThan', field, value))
    return this
  }

  greaterThanOrEqualTo(field: string, value: any): FilterBuilder {
    this.filters.push(this.getFilter('greaterThanOrEqualTo', field, value))
    return this
  }

  lessThan(field: string, value: any): FilterBuilder {
    this.filters.push(this.getFilter('lessThan', field, value))
    return this
  }

  lessThanOrEqualTo(field: string, value: any): FilterBuilder {
    this.filters.push(this.getFilter('lessThanOrEqualTo', field, value))
    return this
  }

  containedIn(field: string, values: any[]): FilterBuilder {
    this.filters.push(this.getFilter('containedIn', field, values))
    return this
  }

  build(): Filter[] {
    return this.filters
  }
}
