type Params = {
  user?: any
  operation: string
  feature: string
}

class AccessController {
  isOperationAllowed(params: Params): boolean {
    if (params.user) {
      return true
    } else {
      return this.isNotAuthenticatedOperationAllowed(params)
    }
  }

  isNotAuthenticatedOperationAllowed(params: Omit<Params, 'user'>): boolean {
    const { feature, operation } = params

    switch (feature.toUpperCase()) {
      case 'CITIES':
      case 'STATES':
        return operation.toUpperCase() === 'READ'
      case 'OFFICES':
        return operation === 'CREATE'
      case 'USERS':
        return ['RECOVER-PASSWORD', 'LOGIN', 'CHANGE-PASSWORD'].includes(operation)
      default:
        return false
    }
  }
}

export const accessController = new AccessController()
