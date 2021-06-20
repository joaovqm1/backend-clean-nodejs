import {
  BankModelMapper
} from '@/data'
import {
  CreateBankRequestDTO,
  ReadBankResponseDTO,
  ReadBankUseCase,
  UpdateBankRequestDTO,
} from '@/domain'
import { BankViewModelMapper } from '@/presentation'

import { RequestParamsWithUser } from '../request-params'
import { CrudFactory } from './crud'

export class BankFactory {
  private readonly bankCrudFactory: CrudFactory<CreateBankRequestDTO, ReadBankResponseDTO, ReadBankResponseDTO, UpdateBankRequestDTO>

  private readonly readUserUseCase: ReadBankUseCase
  private readonly modelMapper: BankModelMapper

  constructor(readonly requestParams: RequestParamsWithUser) {
    this.modelMapper = new BankModelMapper()
    this.bankCrudFactory = new CrudFactory<CreateBankRequestDTO, ReadBankResponseDTO, ReadBankResponseDTO, UpdateBankRequestDTO>({
      requestParams,
      entityName: 'banks',
      modelMapper: this.modelMapper,
      viewModelMapper: new BankViewModelMapper(),
      isPublicTable: true
    })
  }

  getControllerFacade(): any {
    return this.bankCrudFactory.getControllerFacade()
  }
}
