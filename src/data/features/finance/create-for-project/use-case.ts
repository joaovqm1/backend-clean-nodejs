import { DateUtilities } from '@/data/contracts'
import {
  CreateCrudUseCase,
  CreateFinanceRequestDTO,
  CreateFinancesForProjectRequestDTO,
  CreateFinancesForProjectResponseDTO,
  CreateFinancesForProjectUseCase,
  FinanceStatus,
  FinanceType,
  ReadFinanceResponseDTO
} from '@/domain'
import { ProjectPaymentFinance } from '@/domain/features/common'

interface Params {
  createFinanceUseCase: CreateCrudUseCase<CreateFinanceRequestDTO, ReadFinanceResponseDTO>
  dateUtilities: DateUtilities
}
export class CreateFinancesForProjectUseCaseImpl implements CreateFinancesForProjectUseCase {
  private readonly createFinanceUseCase: CreateCrudUseCase<CreateFinanceRequestDTO, ReadFinanceResponseDTO>
  private readonly dateUtilities: DateUtilities

  constructor(params: Params) {
    this.createFinanceUseCase = params.createFinanceUseCase
    this.dateUtilities = params.dateUtilities
  }

  async create(request: CreateFinancesForProjectRequestDTO): Promise<CreateFinancesForProjectResponseDTO[]> {
    const { project, payment } = request

    const finances: CreateFinancesForProjectResponseDTO[] = []

    if (payment.entry) {
      finances.push(await this.createEntry(request))
    }

    for (const finance of payment.finances) {
      finances.push(await this.createFinance(project, finance))
    }

    return finances
  }

  async createEntry(request: CreateFinancesForProjectRequestDTO): Promise<CreateFinancesForProjectResponseDTO> {
    const { project, payment } = request

    return this.createFinanceUseCase.create({
      project: { id: project.id },
      customerSupplier: project.customer,
      description: `Entrada de valor do projeto - obra: ${project.name}`.toUpperCase(),
      status: FinanceStatus.FINISHED,
      type: FinanceType.INCOME,
      finishDate: this.dateUtilities.format(new Date()),
      financeType: await this.getFinanceType(),
      value: payment.entry
    })
  }

  async getFinanceType(): Promise<{ id: number }> {
    return { id: 1 }
  }

  async createFinance(project: any, receivedFinance: ProjectPaymentFinance): Promise<CreateFinancesForProjectResponseDTO> {
    const requestDTO: CreateFinanceRequestDTO = {
      ...receivedFinance,
      description: `Parcela de valor do projeto - obra: ${project.name}`.toUpperCase(),
      type: FinanceType.INCOME,
      financeType: await this.getFinanceType(),
      project: { id: project.id },
      customerSupplier: project.customer
    }

    const isFinanceFinished = requestDTO.status === FinanceStatus.FINISHED
    if (isFinanceFinished)
      requestDTO.finishDate = receivedFinance.date
    else
      requestDTO.dateToFinish = receivedFinance.date

    return this.createFinanceUseCase.create(requestDTO)
  }
}
