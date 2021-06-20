import { ScopeEntity } from '../entity'

export interface CreateScopeRequestDTO
  extends Omit<ScopeEntity, 'id'> {}
export interface CreateScopeResponseDTO
  extends ScopeEntity {}
