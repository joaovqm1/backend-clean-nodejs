import sinon from 'sinon'
import faker from 'faker'

import { AfterUpdateCrudUseCaseImpl, FilterBuilder } from '@/data'
import { mockReadCrudUseCase } from '@/test/unit/data/mocks'
import { } from '@/utilities'

describe('After Create Crud Use Case', function() {
  const useCase = new AfterUpdateCrudUseCaseImpl<any>({
    readCrudUseCase: mockReadCrudUseCase,
    fieldsToInclude: []
  })

  it('Should call read use case with id', async function() {
    // Arrange
    const mockId = faker.datatype.number()

    const mockObject = faker.random.objectElement()

    const mockFilters = new FilterBuilder()
      .include([])
      .build()

    sinon.stub(mockReadCrudUseCase, 'getById').withArgs(mockId, mockFilters).resolves(mockObject)

    // Act
    const receivedObject = await useCase.fetchAfterUpdate(mockId)

    // Assert
    const expectedObject = mockObject
    expect(receivedObject).toEqual(expectedObject)
  })

  it('Should return undefined', function() {
    // Act
    // Assert
    expect(useCase.getExtraFields()).toBeUndefined()
  })
})