import {
  ScopeModelMapper,
} from '@/data'
import {
  CreateScopeRequestDTO,
  ReadCrudUseCase,
  ReadScopeResponseDTO,
  UpdateScopeRequestDTO,
} from '@/domain'
import { ScopeViewModelMapper } from '@/presentation'

import { RequestParamsWithUser } from '../request-params'
import { CrudFactory } from './crud'

export class ScopeFactory {
  private readonly scopeCrudFactory: CrudFactory<CreateScopeRequestDTO, ReadScopeResponseDTO, ReadScopeResponseDTO, UpdateScopeRequestDTO>
  constructor(readonly requestParams: RequestParamsWithUser) {
    this.scopeCrudFactory = new CrudFactory<CreateScopeRequestDTO, ReadScopeResponseDTO, ReadScopeResponseDTO, UpdateScopeRequestDTO>({
      requestParams,
      entityName: 'scopes',
      modelMapper: new ScopeModelMapper(),
      viewModelMapper: new ScopeViewModelMapper(),
      uniqueConstraintError: 'Já existe um escopo cadastrado com essa descrição',
      isHybridTable: true
    })
  }

  getControllerFacade(): any {
    return this.scopeCrudFactory.getControllerFacade()
  }

  getReadCrudUseCase(): ReadCrudUseCase<ReadScopeResponseDTO> {
    return this.scopeCrudFactory.getReadUseCase()
  }
}
