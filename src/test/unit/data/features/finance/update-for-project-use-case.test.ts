import sinon from 'sinon'

import { FilterBuilder, UpdateFinancesForProjectUseCaseImpl } from '@/data'
import { dateUtilities } from '@/main'
import { mockDeleteCrudUseCase, mockReadCrudUseCase, mockUpdateCrudUseCase } from '../../mocks'
import { CreateFinancesForProjectUseCase, FinanceStatus, } from '@/domain'
import { mockFinanceEntity, mockProjectEntity } from '@/test/utilities/mocks'
import { mockProject, mockRequest } from './mocks'

describe('Create Finances for Project', function() {
  const mockCreateFinancesForProjectUseCase: CreateFinancesForProjectUseCase = {
    create: jest.fn()
  }

  const useCase = new UpdateFinancesForProjectUseCaseImpl({
    createFinanceForProjectUseCase: mockCreateFinancesForProjectUseCase,
    readFinanceUseCase: mockReadCrudUseCase,
    deleteFinanceUseCase: mockDeleteCrudUseCase,
    dateUtilities
  })

  it('Should call function to remove current finances, call function to create the new ones and return them', async function() {
    // Arrange
    const removeCurrentFinancesSpy = jest.spyOn(useCase, 'removeCurrentFinances')
    removeCurrentFinancesSpy.mockResolvedValue()
    sinon.stub(mockCreateFinancesForProjectUseCase, 'create')
      .withArgs(mockRequest)
      .resolves([mockFinanceEntity])

    // Act
    const receivedFinances = await useCase.update(mockRequest)

    // Assert
    const expectedFinances = [mockFinanceEntity]
    expect(receivedFinances).toEqual(expectedFinances)
    expect(removeCurrentFinancesSpy).toHaveBeenCalledWith(mockRequest.project.id)
  })

  it('Should return empty array when there is no payment', async function() {
    // Arrange
    // Act
    const receivedFinances = await useCase.update({
      ...mockRequest,
      payment: undefined
    })

    // Assert
    const expectedFinances = []
    expect(receivedFinances).toEqual(expectedFinances)
  })

  it('Should remove the current finances', async function() {
    // Arrange
    const deleteSpy = jest.spyOn(mockDeleteCrudUseCase, 'delete')
    deleteSpy.mockResolvedValue('Item removido com sucesso')
    sinon.stub(useCase, 'getCurrentProjectFinances').withArgs(mockProjectEntity.id).resolves([mockFinanceEntity])

    // Act
    await useCase.removeCurrentFinances(mockProjectEntity.id)

    // Assert
    expect(deleteSpy).toHaveBeenCalledWith(mockFinanceEntity.id)
  })

  it('Should return the current project finances', async function() {
    // Arrange
    const filters = new FilterBuilder()
      .equalTo('projectId', mockProject.id)
      .select(['type', 'description', 'status', 'finishDate', 'dateToFinish', 'value', 'financeTypeId'])
      .build()

    sinon.stub(mockReadCrudUseCase, 'getMany').withArgs(filters).resolves({ items: [mockFinanceEntity] })

    // Act
    const receivedFinances = await useCase.getCurrentProjectFinances(mockProject.id)

    // Assert
    const expectedFinances = [mockFinanceEntity]
    expect(receivedFinances).toEqual(expectedFinances)
  })
})

afterEach(() => {
  sinon.restore()
  jest.restoreAllMocks()
})