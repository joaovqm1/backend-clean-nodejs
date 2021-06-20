import {
  AfterCreateCrudUseCase,
  AfterUpdateCrudUseCase,
} from '@/domain/features/crud'

import { ReadFinanceMethodResponseDTO } from './dtos'

export interface ReadFinanceMethodUseCase
  extends AfterCreateCrudUseCase<ReadFinanceMethodResponseDTO>,
  AfterUpdateCrudUseCase<ReadFinanceMethodResponseDTO> {}
