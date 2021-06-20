import {
  AfterCreateCrudUseCase,
  AfterUpdateCrudUseCase,
} from '@/domain/features/crud'

import { ReadUserResponseDTO } from './response-dto'

export interface ReadUserUseCase
  extends AfterCreateCrudUseCase<ReadUserResponseDTO>,
  AfterUpdateCrudUseCase<ReadUserResponseDTO> {}
