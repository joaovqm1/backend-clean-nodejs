export interface ProjectScopeEntity {
  id: number
  scope: {
    id: number
    description?: string
  }
  project: {
    id: number
    name?: string
  }
}

export const projectScopesFieldsToInclude = [
  'scope.id',
  'scope.description'
]
