import sinon from 'sinon'

import { CreateFinancesForProjectUseCaseImpl } from '@/data'
import { dateUtilities } from '@/main'
import { mockCreateCrudUseCase } from '../../mocks'
import { FinanceStatus, FinanceType } from '@/domain'
import { mockFinanceEntity } from '@/test/utilities/mocks'
import { mockFinances, mockProject, mockRequest } from './mocks'

describe('Create Finances for Project', function() {
  const useCase = new CreateFinancesForProjectUseCaseImpl({
    createFinanceUseCase: mockCreateCrudUseCase,
    dateUtilities
  })

  it('Should create finances and return them', async function() {
    // Arrange
    sinon.stub(useCase, 'createEntry').withArgs(mockRequest).resolves(mockFinanceEntity)

    const createFinanceStub = sinon.stub(useCase, 'createFinance')
    for (const mockFinance of mockFinances) {
      createFinanceStub.withArgs(mockProject, mockFinance).resolves(mockFinanceEntity)
    }

    // Act
    const receivedFinances = await useCase.create(mockRequest)

    // Assert
    const expectedFinances = [mockFinanceEntity]
    for (let i = 0; i < mockFinances.length; i++) {
      expectedFinances.push(mockFinanceEntity)
    }
    expect(receivedFinances).toEqual(expectedFinances)
  })

  it('Should call create for entry and return it', async function() {
    // Arrange
    const mockFianceType = { id: 1 }
    sinon.stub(useCase, 'getFinanceType').withArgs().resolves(mockFianceType)

    sinon.stub(mockCreateCrudUseCase, 'create').withArgs({
      project: { id: mockRequest.project.id },
      customerSupplier: mockRequest.project.customer,
      description: `Entrada de valor do projeto - obra: ${mockRequest.project.name}`.toUpperCase(),
      status: FinanceStatus.FINISHED,
      type: FinanceType.INCOME,
      finishDate: dateUtilities.format(new Date()),
      financeType: mockFianceType,
      value: mockRequest.payment.entry
    }).resolves(mockFinanceEntity)

    // Act
    const receivedResponseDTO = await useCase.createEntry(mockRequest)

    // Assert
    const expectedResponseDTO = mockFinanceEntity
    expect(receivedResponseDTO).toEqual(expectedResponseDTO)
  })

  it('Should return the finance type', async function() {
    // Act
    const receivedFinanceType = await useCase.getFinanceType()

    // Assert
    const expectedFinanceType = { id: 1 }
    expect(receivedFinanceType).toEqual(expectedFinanceType)
  })

  it('Should call create for finished finance and return it', async function() {
    // Arrange
    const mockFianceType = { id: 1 }
    sinon.stub(useCase, 'getFinanceType').withArgs().resolves(mockFianceType)

    sinon.stub(mockCreateCrudUseCase, 'create').withArgs({
      ...mockFinances[0],
      description: `Parcela de valor do projeto - obra: ${mockProject.name}`.toUpperCase(),
      type: FinanceType.INCOME,
      status: FinanceStatus.FINISHED,
      finishDate: mockFinances[0].date,
      financeType: mockFianceType,
      project: { id: mockProject.id },
      customerSupplier: mockProject.customer
    }).resolves(mockFinanceEntity)

    // Act
    const receivedResponseDTO = await useCase.createFinance(
      mockProject, {
      ...mockFinances[0],
      status: FinanceStatus.FINISHED
    })

    // Assert
    const expectedResponseDTO = mockFinanceEntity
    expect(receivedResponseDTO).toEqual(expectedResponseDTO)
  })

  it('Should call create for opened finance and return it', async function() {
    // Arrange
    const mockFianceType = { id: 1 }
    sinon.stub(useCase, 'getFinanceType').withArgs().resolves(mockFianceType)

    sinon.stub(mockCreateCrudUseCase, 'create').withArgs({
      ...mockFinances[0],
      description: `Parcela de valor do projeto - obra: ${mockProject.name}`.toUpperCase(),
      type: FinanceType.INCOME,
      status: FinanceStatus.OPENED,
      dateToFinish: mockFinances[0].date,
      financeType: mockFianceType,
      project: { id: mockProject.id },
      customerSupplier: mockProject.customer
    }).resolves(mockFinanceEntity)

    // Act
    const receivedResponseDTO = await useCase.createFinance(
      mockProject, {
      ...mockFinances[0],
      status: FinanceStatus.OPENED
    })

    // Assert
    const expectedResponseDTO = mockFinanceEntity
    expect(receivedResponseDTO).toEqual(expectedResponseDTO)
  })
})

afterEach(() => sinon.restore())