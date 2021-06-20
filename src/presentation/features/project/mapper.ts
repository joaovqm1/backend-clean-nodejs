/* eslint-disable sonarjs/no-identical-functions */
import { StringUtilities } from '@/data'
import {
  CreateProjectRequestDTO,
  Filter,
  FinanceStatus,
  FinanceType,
  projectFieldsToInclude,
  ProjectFinance,
  ProjectPaymentRequestDTO,
  ReadProjectResponseDTO,
  UpdateCrudRequestDTO,
  UpdateProjectRequestDTO,
} from '@/domain'
import { BaseCrudViewModelMapper } from '@/presentation/base-crud-view-model-mapper'
import { transformRequestToFilters } from '@/presentation/request-to-filters'

import { FinanceStatusViewModel, fromDTOStatusToViewStatus } from '../finance'

interface ProjectFinanceViewModel extends Omit<ProjectFinance, 'status'> {
  status: FinanceStatusViewModel
}

interface ProjectPaymentRequestViewModel extends Omit<ProjectPaymentRequestDTO, 'finances'> {
  finances?: Array<{
    value: number
    date: string
    status: FinanceStatusViewModel
  }>
}

export interface CreateProjectRequestViewModel extends Omit<CreateProjectRequestDTO, 'payment'> {
  payment?: ProjectPaymentRequestViewModel
}
export interface CreateProjectResponseViewModel extends Omit<ReadProjectResponseDTO, 'finances'> {
  finances: ProjectFinanceViewModel[]
}

export interface UpdateProjectRequestViewModel extends Omit<UpdateProjectRequestDTO, 'payment'> {
  payment?: ProjectPaymentRequestViewModel
}
export interface UpdateProjectResponseViewModel extends Omit<ReadProjectResponseDTO, 'finances'> {
  finances: ProjectFinanceViewModel[]
}

export interface ReadProjectRequestViewModel {
  id?: number
  name?: string
  status?: string
  type?: string
}
export interface ReadProjectResponseViewModel extends Omit<ReadProjectResponseDTO, 'finances'> {
  finances: ProjectFinanceViewModel[]
}

export class ProjectViewModelMapper implements BaseCrudViewModelMapper {
  constructor(private readonly stringUtilities: StringUtilities) { }

  fromCreateRequestViewModelToCreateRequestDTO(request: CreateProjectRequestViewModel): CreateProjectRequestDTO {
    return this.fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(request) as CreateProjectRequestDTO
  }

  fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(
    request: CreateProjectRequestViewModel | UpdateProjectRequestViewModel
  ): CreateProjectRequestDTO | UpdateCrudRequestDTO {
    return {
      ...request,
      name: request.name.toUpperCase(),
      address: request.address?.toUpperCase(),
      neighborhood: request.neighborhood?.toUpperCase(),
      postcode: this.stringUtilities.removeSpecialCharactersFromString(request.postcode),
      addressComplement: request.addressComplement?.toUpperCase(),
      addressReference: request.addressReference?.toUpperCase(),
      addressNumber: request.addressNumber?.toUpperCase(),
      annotation: request.annotation?.toUpperCase(),
      payment: this.adjustaProjectPayment(request.payment)
    }
  }

  fromCreateResponseDTOToCreateResponseViewModel(response: ReadProjectResponseDTO): CreateProjectResponseViewModel {
    response.finances?.sort((a, b) => +(a.dateToFinish || a.finishDate) - +(b.dateToFinish || b.finishDate))

    return {
      ...response,
      finances: this.adjustFinancesStatus(response.finances)
    }
  }

  adjustFinancesStatus(finances: any[] = []): any[] {
    return finances.map((finance) => {
      return {
        ...finance,
        status: fromDTOStatusToViewStatus(finance.type || FinanceType.INCOME, finance.status)
      }
    })
  }

  adjustaProjectPayment(
    payment: ProjectPaymentRequestViewModel
  ): ProjectPaymentRequestDTO {
    if (payment === undefined) {
      return undefined
    } else {
      return {
        ...payment,
        finances: payment.finances.map((finance) => {
          return {
            ...finance,
            status: [FinanceStatusViewModel.NOTRECEIVED, FinanceStatusViewModel.UNPAID].includes(finance.status) ?
              FinanceStatus.OPENED : FinanceStatus.FINISHED
          }
        })
      }
    }
  }

  fromUpdateRequestViewModelToUpdateRequestDTO(request: UpdateProjectRequestViewModel): UpdateProjectRequestDTO {
    return this.fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(request) as UpdateProjectRequestDTO
  }

  fromUpdateResponseDTOToUpdateResponseViewModel(response: ReadProjectResponseDTO): ReadProjectResponseViewModel {
    response.finances?.sort((a, b) => +(a.dateToFinish || a.finishDate) - +(b.dateToFinish || b.finishDate))
    return {
      ...response,
      finances: this.adjustFinancesStatus(response.finances)
    }
  }

  fromReadRequestViewModelToFilters(request: ReadProjectRequestViewModel): Filter[] {
    return transformRequestToFilters({
      request,
      fieldsAndFilters: {
        id: 'equalTo',
        name: 'equalTo',
        type: 'equalTo',
        status: 'equalTo'
      },
      fieldsToInclude: projectFieldsToInclude
    })
  }

  fromReadOneResponseDTOToReadResponseOneViewModel(response: ReadProjectResponseDTO): ReadProjectResponseViewModel {
    if (response.finances) {
      response.finances.sort((a, b) => +(a.dateToFinish || a.finishDate) - +(b.dateToFinish || b.finishDate))
    }
    return {
      ...response,
      finances: this.adjustFinancesStatus(response.finances)
    }
  }

  fromReadManyResponseDTOToReadResponseOneViewModel(responses: ReadProjectResponseDTO[]): ReadProjectResponseViewModel[] {
    return responses.map(response => this.fromReadOneResponseDTOToReadResponseOneViewModel(response))
  }
}
