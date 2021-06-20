import sinon from 'sinon'
import { omit } from 'lodash'

import { CreateOfficeRequestDTO } from '@/domain'
import { OfficeModelMapper, OfficeModel } from '@/data/features'
import { mockOfficeEntity } from '@/test/utilities/mocks'

afterEach(function() {
  sinon.restore()
})

describe('Data - Office Mapper', function() {
  const officeModelMapper = new OfficeModelMapper()

  it('Should return model when is sent a create request', function() {
    const request: CreateOfficeRequestDTO = {
      ...omit(mockOfficeEntity, ['id']),
      user: {
        username: 'user',
        password: 'user'
      }
    }

    const params = {
      ...request
    }
    delete params.city
    delete params.plan
    delete params.state

    const objectModel: Omit<OfficeModel, 'id'> = {
      ...params,
      planId: mockOfficeEntity.plan.id,
      stateId: mockOfficeEntity.state.id,
      cityId: mockOfficeEntity.city.id
    }

    expect(officeModelMapper.fromCreateRequestDTOToModel(request)).toEqual(objectModel)
  })

  it('Should return read one response when is sent a model', function() {
    const model = {
      ...mockOfficeEntity,
      planId: 1,
      cityId: 0,
      stateId: 0
    }

    const response = {
      ...model
    }

    expect(officeModelMapper.fromModelToReadOneResponse(model)).toEqual(response)
  })

  it('Should return read many responses when is sent a model array', function() {
    const models = [{
      ...mockOfficeEntity,
      planId: 1,
      cityId: 0,
      stateId: 0
    }]

    const response = [{
      ...models[0]
    }]

    expect(officeModelMapper.fromModelToReadManyResponse(models)).toEqual(response)
  })

  it('Should return model when is sent update request', function() {
    const request = mockOfficeEntity

    const response = {
      ...request,
      planId: request.plan.id,
      stateId: request.state.id,
      cityId: request.city.id
    }

    expect(officeModelMapper.fromUpdateRequestDTOToModel(request)).toEqual(response)
  })
})

afterEach(() => sinon.restore())
