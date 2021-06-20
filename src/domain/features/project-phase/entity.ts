export interface ProjectPhaseEntity {
  id: number
  phase: {
    id: number
    description?: string
  }
  project: {
    id: number
    name?: string
  }
  startDate: string
  dueDate?: string
  finishDate?: string
}

export const projectPhasesFieldsToInclude = [
  'phase.id',
  'phase.description'
]
