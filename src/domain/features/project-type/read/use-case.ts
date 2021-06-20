import {
  AfterCreateCrudUseCase,
  AfterUpdateCrudUseCase,
} from '@/domain/features/crud'

import { ReadProjectTypeResponseDTO } from './dtos'

export interface ReadProjectTypeUseCase
  extends AfterCreateCrudUseCase<ReadProjectTypeResponseDTO>,
  AfterUpdateCrudUseCase<ReadProjectTypeResponseDTO> {}
