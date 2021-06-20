import {
  AfterCreateCrudUseCase,
  AfterUpdateCrudUseCase,
} from '@/domain/features/crud'

import { ReadFinanceTypeResponseDTO } from './dtos'

export interface ReadFinanceTypeUseCase
  extends AfterCreateCrudUseCase<ReadFinanceTypeResponseDTO>,
  AfterUpdateCrudUseCase<ReadFinanceTypeResponseDTO> {}
