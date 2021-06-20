import { CityEntity } from '../city'
import { CustomerSupplierEntity } from '../customer-supplier'
import { FinanceEntity } from '../finances'
import { UserEntity } from '../office-user'
import { ProjectPhaseEntity } from '../project-phase'
import { ProjectScopeEntity } from '../project-scope'
import { ProjectStatusEntity } from '../project-status'
import { ProjectTypeEntity } from '../project-type'
import { StateEntity } from '../state'

export interface ProjectPayment {
  value: number
  entry?: number
  interval: number
  numberOfFinances: number
  financesValue: number
  firstFinanceDate?: string
}

export interface ProjectFinance extends
  Omit<FinanceEntity, 'customerSupplier' | 'financeType' | 'financeMethod' | 'project'> {
}
export interface ProjectEntity {
  id: number
  name: string
  projectType: ProjectTypeEntity
  projectStatus: ProjectStatusEntity
  customer: Pick<CustomerSupplierEntity, 'id' | 'name'>
  technicalManager: Pick<UserEntity, 'id' | 'name'>
  projectScopes?: Array<Omit<ProjectScopeEntity, 'project'>>
  projectPhases: Array<Omit<ProjectPhaseEntity, 'project'>>
  finances?: ProjectFinance[]
  startDate: string
  finishDate?: string
  dueDate?: string
  totalArea?: number
  postcode?: string
  address?: string
  neighborhood?: string
  addressReference?: string
  addressComplement?: string
  addressNumber?: string
  city?: Pick<CityEntity, 'id' | 'name'>
  state?: Pick<StateEntity, 'id' | 'name'>
  annotation?: string
  payment?: ProjectPayment
}

export const projectFieldsToInclude = [
  'customer.id',
  'customer.name',
  'technicalManager.id',
  'technicalManager.name',
  'projectType.id',
  'projectType.description',
  'projectStatus.id',
  'projectStatus.description',
  'tasks.id',
  'tasks.title',
  'tasks.description',
  'tasks.status',
  'tasks.startDate',
  'tasks.startTime',
  'tasks.finishTime',
  'tasks.responsible.id',
  'tasks.responsible.name',
  'finances.id',
  'finances.description',
  'finances.status',
  'finances.type',
  'finances.value',
  'finances.finishDate',
  'finances.dateToFinish',
  'finances.financeType.id',
  'finances.financeType.description',
  'finances.customerSupplier.id',
  'finances.customerSupplier.name',
  'documents.id',
  'documents.description',
  'documents.key',
  'documents.name',
  'documents.path',
  'documents.extension',
  'documents.mimeType',
  'documents.size',
  'projectScopes.id',
  'projectScopes.scope.id',
  'projectScopes.scope.description',
  'projectPhases.id',
  'projectPhases.startDate',
  'projectPhases.dueDate',
  'projectPhases.finishDate',
  'projectPhases.phase.id',
  'projectPhases.phase.description',
  'city.id',
  'city.name',
  'state.id',
  'state.name'
]
