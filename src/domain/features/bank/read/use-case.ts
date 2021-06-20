import {
  AfterCreateCrudUseCase,
  AfterUpdateCrudUseCase,
} from '@/domain/features/crud'

import { ReadBankResponseDTO } from './dtos'
export interface ReadBankUseCase
  extends AfterCreateCrudUseCase<ReadBankResponseDTO>,
  AfterUpdateCrudUseCase<ReadBankResponseDTO> { }
