import {
  AfterCreateCrudUseCase,
  AfterUpdateCrudUseCase,
} from '@/domain/features/crud'

import { ReadDocumentResponseDTO } from './dtos'

export interface ReadDocumentUseCase
  extends AfterCreateCrudUseCase<ReadDocumentResponseDTO>,
  AfterUpdateCrudUseCase<ReadDocumentResponseDTO> {}
