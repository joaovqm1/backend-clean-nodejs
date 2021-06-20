import { accessController } from '@/data/access-controller'

describe('Access Controller', function() {
  it('Should return true if params contains user', function() {
    const params = {
      user: {},
      operation: 'CREATE',
      feature: 'feature'
    }

    expect(accessController.isOperationAllowed(params)).toBe(true)
  })

  it('Should return true if feature is city or state and operation is read', async function() {
    // Act
    // Assert
    for (const feature of ['cities', 'states']) {
      expect(accessController.isOperationAllowed({ operation: 'READ', feature })).toBe(true)
    }
  })

  it('Should return true if feature is user and operation is password recover or login', async function() {
    // Act
    // Assert
    for (const operation of ['RECOVER-PASSWORD', 'LOGIN', 'CHANGE-PASSWORD']) {
      expect(accessController.isOperationAllowed({ operation, feature: 'users' })).toBe(true)
    }
  })

  it('Should return true if feature is office and operation is create', async function() {
    // Act
    // Assert
    expect(accessController.isOperationAllowed({ operation: 'CREATE', feature: 'offices' })).toBe(true)
  })

  it('Should return false', async function() {
    // Act
    // Assert
    expect(accessController.isOperationAllowed({
      operation: 'CREATE',
      feature: 'features'
    })).toBe(false)
  })
})