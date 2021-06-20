import {
  AfterCreateCrudUseCase,
  AfterUpdateCrudUseCase,
} from '@/domain/features/crud'

import { ReadProjectStatusResponseDTO } from './dtos'

export interface ReadProjectStatusUseCase
  extends AfterCreateCrudUseCase<ReadProjectStatusResponseDTO>,
  AfterUpdateCrudUseCase<ReadProjectStatusResponseDTO> {}
