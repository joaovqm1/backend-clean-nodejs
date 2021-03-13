type Params = {
  user: any
  operation: string
  feature: string
}

class AccessController {
  check(params: Params): boolean {
    return true
  }
}

export const accessController = new AccessController()
