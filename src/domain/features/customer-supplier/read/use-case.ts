import {
  AfterCreateCrudUseCase,
  AfterUpdateCrudUseCase,
} from '@/domain/features/crud'

import { ReadCustomerSupplierResponseDTO } from './dtos'

export interface ReadCustomerSupplierUseCase
  extends AfterCreateCrudUseCase<ReadCustomerSupplierResponseDTO>,
  AfterUpdateCrudUseCase<ReadCustomerSupplierResponseDTO> { }
