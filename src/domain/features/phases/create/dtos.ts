import { PhasesEntity } from '../entity'

export interface CreatePhasesRequestDTO extends Omit<PhasesEntity, 'id'> { }
export interface CreatePhasesResponseDTO extends PhasesEntity { }
