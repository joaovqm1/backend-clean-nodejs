import {
  AfterCreateCrudUseCase,
  AfterUpdateCrudUseCase,
} from '@/domain/features/crud'

import { ReadTaskResponseDTO } from './dtos'

export interface ReadTaskUseCase
  extends AfterCreateCrudUseCase<ReadTaskResponseDTO>,
  AfterUpdateCrudUseCase<ReadTaskResponseDTO> {}
