import {
  FinanceMethodModelMapper,
} from '@/data'
import {
  CreateFinanceMethodRequestDTO,
  ReadFinanceMethodResponseDTO,
  ReadFinanceMethodUseCase,
  UpdateFinanceMethodRequestDTO,
} from '@/domain'
import { FinanceMethodViewModelMapper } from '@/presentation'

import { RequestParamsWithUser } from '../request-params'
import { CrudFactory } from './crud'

export class FinanceMethodFactory {
  private readonly financeMethodCrudFactory: CrudFactory<CreateFinanceMethodRequestDTO, ReadFinanceMethodResponseDTO, ReadFinanceMethodResponseDTO, UpdateFinanceMethodRequestDTO>

  private readonly readUserUseCase: ReadFinanceMethodUseCase
  private readonly modelMapper: FinanceMethodModelMapper

  constructor(readonly requestParams: RequestParamsWithUser) {
    this.modelMapper = new FinanceMethodModelMapper()
    this.financeMethodCrudFactory = new CrudFactory<CreateFinanceMethodRequestDTO, ReadFinanceMethodResponseDTO, ReadFinanceMethodResponseDTO, UpdateFinanceMethodRequestDTO>({
      requestParams,
      entityName: 'financeMethod',
      modelMapper: this.modelMapper,
      viewModelMapper: new FinanceMethodViewModelMapper(),
      uniqueConstraintError: 'Já existe um método financeiro cadastrado com essa descrição',
      isHybridTable: true
    })
  }

  getControllerFacade(): any {
    return this.financeMethodCrudFactory.getControllerFacade()
  }
}
