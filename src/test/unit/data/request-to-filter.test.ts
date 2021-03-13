import { fromAnyReadRequestToReadRequestDTO } from '@/data'

describe('Filter Setter', function() {

  it('Should return the filter with the equalTo fields and fieldsToInclude setted', function() {
    const request = {
      id: 1,
      field: 'another field'
    }
    expect(fromAnyReadRequestToReadRequestDTO({ request: request, fieldsToInclude: ['field1', 'field2'] })).toEqual({
      fieldsToInclude: [
        'field1',
        'field2',
      ],
      filters: [
        {
          equalTo: {
            id: 1,
          },
        },
        {
          equalTo: {
            field: 'another field',
          },
        }
      ],
    })
  })

  it('Should return the filter with the equalTo fields setted', function() {
    const request = {
      id: 1,
      field: 'another field'
    }
    expect(fromAnyReadRequestToReadRequestDTO({ request })).toEqual({
      filters: [
        {
          equalTo: {
            id: 1,
          },
        },
        {
          equalTo: {
            field: 'another field',
          },
        }
      ]
    })
  })

})