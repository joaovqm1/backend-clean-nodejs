import {
  AfterCreateCrudUseCase,
  AfterUpdateCrudUseCase,
} from '@/domain/features/crud'

import { ReadScopeResponseDTO } from './dtos'

export interface ReadScopeUseCase
  extends AfterCreateCrudUseCase<ReadScopeResponseDTO>,
  AfterUpdateCrudUseCase<ReadScopeResponseDTO> {}
