import {
  AfterCreateCrudUseCase,
  AfterUpdateCrudUseCase,
} from '@/domain/features/crud'

import { ReadPhaseResponseDTO } from './dtos'

export interface ReadPhasesUseCase
  extends AfterCreateCrudUseCase<ReadPhaseResponseDTO>,
  AfterUpdateCrudUseCase<ReadPhaseResponseDTO> { }
