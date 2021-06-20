import {
  FinanceTypeModelMapper,
} from '@/data'
import {
  CreateFinanceTypeRequestDTO,
  ReadFinanceTypeResponseDTO,
  UpdateFinanceTypeRequestDTO,
} from '@/domain'
import { FinanceTypeViewModelMapper } from '@/presentation'

import { RequestParamsWithUser } from '../request-params'
import { CrudFactory } from './crud'

export class FinanceTypeFactory {
  private readonly financeTypeCrudFactory: CrudFactory<CreateFinanceTypeRequestDTO, ReadFinanceTypeResponseDTO, ReadFinanceTypeResponseDTO, UpdateFinanceTypeRequestDTO>
  private readonly modelMapper: FinanceTypeModelMapper

  constructor(readonly requestParams: RequestParamsWithUser) {
    this.modelMapper = new FinanceTypeModelMapper()
    this.financeTypeCrudFactory = new CrudFactory<CreateFinanceTypeRequestDTO, ReadFinanceTypeResponseDTO, ReadFinanceTypeResponseDTO, UpdateFinanceTypeRequestDTO>({
      requestParams,
      entityName: 'financeType',
      modelMapper: this.modelMapper,
      viewModelMapper: new FinanceTypeViewModelMapper(),
      uniqueConstraintError: 'Já existe um tipo financeiro cadastrado com essa descrição',
      isHybridTable: true
    })
  }

  getControllerFacade(): any {
    return this.financeTypeCrudFactory.getControllerFacade()
  }
}
