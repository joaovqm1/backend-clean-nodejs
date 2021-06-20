import {
  CreateFinanceRequestDTO,
  Filter,
  financeFieldsToInclude,
  FinanceStatus,
  FinanceType,
  ReadFinanceResponseDTO,
  UpdateCrudRequestDTO,
  UpdateFinanceRequestDTO,
  UpdateFinanceResponseDTO,
} from '@/domain'
import { BaseCrudViewModelMapper } from '@/presentation/base-crud-view-model-mapper'
import { transformRequestToFilters } from '@/presentation/request-to-filters'

export enum FinanceStatusViewModel {
  PAID = 'PAGO',
  UNPAID = 'Á PAGAR',
  RECEIVED = 'RECEBIDO',
  NOTRECEIVED = 'Á RECEBER'
}

export interface CreateFinanceRequestViewModel extends Omit<CreateFinanceRequestDTO, 'type' | 'status'> {
  status: FinanceStatusViewModel
}
export interface CreateFinanceResponseViewModel extends Omit<ReadFinanceResponseDTO, 'status'> {
  status: FinanceStatusViewModel
}
export interface ReadFinanceRequestViewModel {
  id?: number
}
export interface ReadFinanceResponseViewModel extends Omit<ReadFinanceResponseDTO, 'status'> {
  status: FinanceStatusViewModel
}
export interface UpdateFinanceRequestViewModel extends Omit<UpdateFinanceRequestDTO, 'status' | 'type'> {
  status: FinanceStatusViewModel
}
export interface UpdateFinanceResponseViewModel extends Omit<UpdateFinanceRequestDTO, 'status'> {
  status: FinanceStatusViewModel
}
export class FinanceViewModelMapper implements BaseCrudViewModelMapper {
  constructor(private readonly type: FinanceType) { }

  fromCreateRequestViewModelToCreateRequestDTO(request: CreateFinanceRequestViewModel): CreateFinanceRequestDTO {
    let requestModified: CreateFinanceRequestViewModel
    if ([FinanceStatusViewModel.UNPAID, FinanceStatusViewModel.NOTRECEIVED].includes(request.status)) {
      requestModified = {
        ...request,
        finishDate: undefined,
        dateToFinish: request.dateToFinish
      }
      delete requestModified.finishDate
    } else {
      requestModified = {
        ...request,
        dateToFinish: undefined,
        finishDate: request.finishDate
      }
      delete requestModified.dateToFinish
    }

    return this.fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(requestModified) as CreateFinanceRequestDTO
  }

  fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(request: | CreateFinanceRequestViewModel | UpdateFinanceRequestViewModel): CreateFinanceRequestDTO | UpdateCrudRequestDTO {
    return {
      ...request,
      type: this.type,
      description: request.description.toUpperCase(),
      status: fromViewStatusToDTOStatus(request.status)
    }
  }

  fromCreateResponseDTOToCreateResponseViewModel(
    response: ReadFinanceResponseDTO
  ): CreateFinanceResponseViewModel {
    return this.fromResponseDTOToResponseViewModel(response) as CreateFinanceResponseViewModel
  }

  fromResponseDTOToResponseViewModel(
    response: ReadFinanceResponseDTO
  ): CreateFinanceResponseViewModel | UpdateFinanceResponseViewModel {
    return {
      ...response,
      status: fromDTOStatusToViewStatus(this.type, response.status)
    }
  }



  fromUpdateRequestViewModelToUpdateRequestDTO(
    request: UpdateFinanceRequestViewModel
  ): UpdateFinanceResponseDTO {
    return this.fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(
      request
    ) as UpdateFinanceResponseDTO
  }

  fromUpdateResponseDTOToUpdateResponseViewModel(
    response: ReadFinanceResponseDTO
  ): UpdateFinanceResponseViewModel {
    return this.fromResponseDTOToResponseViewModel(response) as UpdateFinanceResponseViewModel
  }

  fromReadRequestViewModelToFilters(request: ReadFinanceRequestViewModel): Filter[] {
    return transformRequestToFilters({
      request,
      fieldsToInclude: financeFieldsToInclude
    })
  }

  fromReadOneResponseDTOToReadResponseOneViewModel(
    response: ReadFinanceResponseDTO
  ): ReadFinanceResponseViewModel {
    return this.fromResponseDTOToResponseViewModel(response) as ReadFinanceResponseViewModel
  }

  fromReadManyResponseDTOToReadResponseOneViewModel(
    responses: ReadFinanceResponseDTO[]
  ): ReadFinanceResponseViewModel[] {
    return responses.map(response => this.fromReadOneResponseDTOToReadResponseOneViewModel(response))
  }
}

export function fromViewStatusToDTOStatus(status: FinanceStatusViewModel): FinanceStatus {
  if ([FinanceStatusViewModel.UNPAID, FinanceStatusViewModel.NOTRECEIVED].includes(status)) {
    return FinanceStatus.OPENED
  } else {
    return FinanceStatus.FINISHED
  }
}

export function fromDTOStatusToViewStatus(type: FinanceType, status: FinanceStatus): FinanceStatusViewModel {
  if (type === FinanceType.INCOME) {
    return status === FinanceStatus.OPENED ? FinanceStatusViewModel.NOTRECEIVED : FinanceStatusViewModel.RECEIVED
  } else {
    return status === FinanceStatus.OPENED ? FinanceStatusViewModel.UNPAID : FinanceStatusViewModel.PAID
  }
}