import {
  AfterCreateCrudUseCase,
  AfterUpdateCrudUseCase,
} from '@/domain/features/crud'

import { ReadFinanceResponseDTO } from './dtos'

export interface ReadFinanceUseCase
  extends AfterCreateCrudUseCase<ReadFinanceResponseDTO>,
  AfterUpdateCrudUseCase<ReadFinanceResponseDTO> {}
