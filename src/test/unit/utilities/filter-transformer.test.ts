import sinon from 'sinon'

import { FilterTransformerImpl } from '@/utilities'
import { Filter, FilterBuilder } from '@/data'

afterEach(function() {
  sinon.restore()
})

describe('Utilities - Filter Transformer Manager', function() {
  const filterTransformerManager = new FilterTransformerImpl()
  const filterBuilder = new FilterBuilder()

  it('Should select and include fields', function() {
    const fields = ['name', 'id']
    const readCrudRequest = {
      fieldsToSelect: fields
    }
    const filterReturn: Filter = {
      name: 'selectAndInclude',
      fields: fields
    }

    sinon.stub(filterBuilder, 'selectAndInclude').withArgs(fields).returns(filterBuilder)

    expect(filterTransformerManager.transformQueryToFilters(readCrudRequest)).toEqual([filterReturn])
  })

  it('Should include fields', function() {
    const fields = ['id']
    const readCrudRequest = {
      fieldsToInclude: fields
    }
    const filterReturn: Filter = {
      name: 'include',
      fields: fields
    }

    sinon.stub(filterBuilder, 'include').withArgs(fields).returns(filterBuilder)

    expect(filterTransformerManager.transformQueryToFilters(readCrudRequest)).toEqual([filterReturn])
  })

  it('Should shift pagination', function() {
    const readCrudRequest = {
      page: 10
    }
    const filterReturn: Filter = {
      name: 'offset',
      value: 10
    }

    sinon.stub(filterBuilder, 'offset').withArgs(10).returns(filterBuilder)

    expect(filterTransformerManager.transformQueryToFilters(readCrudRequest)).toEqual([filterReturn])
  })

  it('Should limit quantity', function() {
    const readCrudRequest = {
      size: 15
    }
    const filterReturn: Filter = {
      name: 'limit',
      value: 15
    }

    sinon.stub(filterBuilder, 'limit').withArgs(15).returns(filterBuilder)

    expect(filterTransformerManager.transformQueryToFilters(readCrudRequest)).toEqual([filterReturn])
  })

  it('Should verify filter exists', function() {
    const readCrudRequest = {
      filters: [{
        exists: 'Ronaldo'
      }]
    }
    const filterReturn: Filter = {
      name: 'exists',
      field: 'Ronaldo'
    }

    sinon.stub(filterBuilder, 'exists').withArgs('Ronaldo').returns(filterBuilder)

    expect(filterTransformerManager.transformQueryToFilters(readCrudRequest)).toEqual([filterReturn])
  })

  it('Should transform any filter to request', function() {
    const filtersTypes = ['equalTo', 'greaterThan', 'greaterThanOrEqualTo', 'lessThan', 'lessThanOrEqualTo']
    for (const filterType of filtersTypes) {
      const field = 'field'
      const value = 1

      const request: any = {
        filters: [{
          [filterType]: { [field]: value }
        }]
      }

      const filter: Filter = {
        name: filterType,
        field: field,
        value: value
      }

      sinon.stub(filterBuilder, `equalTo`).withArgs(field, value).returns(filterBuilder)
      sinon.stub(filterBuilder, `greaterThan`).withArgs(field, value).returns(filterBuilder)
      sinon.stub(filterBuilder, `greaterThanOrEqualTo`).withArgs(field, value).returns(filterBuilder)
      sinon.stub(filterBuilder, `lessThan`).withArgs(field, value).returns(filterBuilder)
      sinon.stub(filterBuilder, `lessThanOrEqualTo`).withArgs(field, value).returns(filterBuilder)

      expect(filterTransformerManager.transformQueryToFilters(request)).toEqual([filter])

      sinon.restore()
    }
  })
})

afterEach(() => sinon.restore())
