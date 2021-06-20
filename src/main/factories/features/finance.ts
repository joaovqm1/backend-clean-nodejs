import {
  FilterBuilder,
  FinanceModelMapper
} from '@/data'
import {
  CreateFinanceRequestDTO,
  Filter,
  financeFieldsToInclude,
  FinanceType,
  ReadFinanceResponseDTO,
  UpdateFinanceRequestDTO
} from '@/domain'
import { FinanceViewModelMapper } from '@/presentation'

import { RequestParamsWithUser } from '../request-params'
import { CrudFactory } from './crud'

export class FinanceFactory {
  private readonly financeCrudFactory: CrudFactory<CreateFinanceRequestDTO, ReadFinanceResponseDTO, ReadFinanceResponseDTO, UpdateFinanceRequestDTO>
  private readonly modelMapper: FinanceModelMapper

  constructor(readonly requestParams: RequestParamsWithUser) {
    let defaultGetManyFilters: Filter[] = []
    switch (requestParams.feature.toUpperCase()) {
      case 'EXPENSES':
        defaultGetManyFilters = new FilterBuilder()
          .equalTo('type', FinanceType.EXPENSE)
          .build()
        break
      case 'INCOMES':
        defaultGetManyFilters = new FilterBuilder()
          .equalTo('type', FinanceType.INCOME)
          .build()
        break
    }

    this.modelMapper = new FinanceModelMapper()
    this.financeCrudFactory = new CrudFactory<CreateFinanceRequestDTO, ReadFinanceResponseDTO, ReadFinanceResponseDTO, UpdateFinanceRequestDTO>({
      requestParams,
      entityName: 'finances',
      modelMapper: this.modelMapper,
      viewModelMapper: new FinanceViewModelMapper(requestParams.feature === 'incomes' ? FinanceType.INCOME : FinanceType.EXPENSE),
      fieldsToIncludeOnQuery: financeFieldsToInclude,
      defaultGetManyFilters
    })
  }

  getControllerFacade(): any {
    return this.financeCrudFactory.getControllerFacade()
  }
}
