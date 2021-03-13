import {
  ReadStateResponseDTO,
} from '@/domain'
import { StateModelMapper } from '@/data'
import { StateViewModelMapper } from '@/presentation'
import { CrudFactory } from './crud'
import { RequestParamsWithUser } from '../request-params'

export class StateFactory {
  private readonly StateCrudFactory: CrudFactory<undefined, ReadStateResponseDTO, ReadStateResponseDTO, undefined>
  private readonly modelMapper: StateModelMapper

  constructor(readonly requestParams: RequestParamsWithUser) {
    this.modelMapper = new StateModelMapper()
    this.StateCrudFactory = new CrudFactory<undefined, ReadStateResponseDTO, ReadStateResponseDTO, undefined>({
      requestParams,
      entityName: 'state',
      modelMapper: this.modelMapper,
      viewModelMapper: new StateViewModelMapper()
    })
  }

  getControllerFacade(): any {
    return this.StateCrudFactory.getControllerFacade()
  }
}
