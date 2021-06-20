import { DateUtilities } from '@/data/contracts'
import { FilterBuilder } from '@/data/filter-builder'
import {
  CreateFinancesForProjectUseCase,
  DeleteCrudUseCase,
  ReadCrudUseCase,
  ReadFinanceResponseDTO,
  UpdateFinancesForProjectRequestDTO,
  UpdateFinancesForProjectResponseDTO,
  UpdateFinancesForProjectUseCase
} from '@/domain'

interface Params {
  createFinanceForProjectUseCase: CreateFinancesForProjectUseCase
  readFinanceUseCase: ReadCrudUseCase<ReadFinanceResponseDTO>
  deleteFinanceUseCase: DeleteCrudUseCase
  dateUtilities: DateUtilities
}
export class UpdateFinancesForProjectUseCaseImpl implements UpdateFinancesForProjectUseCase {
  private readonly createFinanceForProjectUseCase: CreateFinancesForProjectUseCase
  private readonly readFinanceUseCase: ReadCrudUseCase<ReadFinanceResponseDTO>
  private readonly deleteFinanceUseCase: DeleteCrudUseCase

  constructor(params: Params) {
    this.readFinanceUseCase = params.readFinanceUseCase
    this.createFinanceForProjectUseCase = params.createFinanceForProjectUseCase
    this.deleteFinanceUseCase = params.deleteFinanceUseCase
  }

  async update(request: UpdateFinancesForProjectRequestDTO): Promise<UpdateFinancesForProjectResponseDTO[]> {
    if (request.payment) {
      const newFinances = await this.createFinanceForProjectUseCase.create({ project: request.project, payment: request.payment })
      await this.removeCurrentFinances(request.project.id)
      return newFinances
    } else {
      return []
    }
  }

  async removeCurrentFinances(projectId: number): Promise<void> {
    const currentFinances = await this.getCurrentProjectFinances(projectId)
    for (const finance of currentFinances) {
      await this.deleteFinanceUseCase.delete(finance.id)
    }
  }

  async getCurrentProjectFinances(projectId: number): Promise<ReadFinanceResponseDTO[]> {
    const filters = new FilterBuilder()
      .equalTo('projectId', projectId)
      .select(['type', 'description', 'status', 'finishDate', 'dateToFinish', 'value', 'financeTypeId'])
      .build()

    return (await this.readFinanceUseCase.getMany(filters)).items
  }
}
