import {
  PhasesModelMapper,
} from '@/data'
import {
  CreatePhasesRequestDTO,
  ReadCrudUseCase,
  ReadPhaseResponseDTO,
  UpdatePhasesRequestDTO,
} from '@/domain'
import { PhasesViewModelMapper } from '@/presentation'

import { RequestParamsWithUser } from '../request-params'
import { CrudFactory } from './crud'

export class PhasesFactory {
  private readonly crudFactory: CrudFactory<CreatePhasesRequestDTO, ReadPhaseResponseDTO, ReadPhaseResponseDTO, UpdatePhasesRequestDTO>
  constructor(readonly requestParams: RequestParamsWithUser) {
    this.crudFactory = new CrudFactory<CreatePhasesRequestDTO, ReadPhaseResponseDTO, ReadPhaseResponseDTO, UpdatePhasesRequestDTO>({
      requestParams,
      entityName: 'phases',
      modelMapper: new PhasesModelMapper(),
      viewModelMapper: new PhasesViewModelMapper(),
      uniqueConstraintError: 'Já existe um passo cadastrado com essa descrição',
      isHybridTable: true
    })
  }

  getControllerFacade(): any {
    return this.crudFactory.getControllerFacade()
  }

  getReadCrudUseCase(): ReadCrudUseCase<ReadPhaseResponseDTO> {
    return this.crudFactory.getReadUseCase()
  }
}
