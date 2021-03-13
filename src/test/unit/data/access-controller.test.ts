import { Roles } from '@/data'
import { accessController } from '@/data/access-controller'
describe('Access Controller', function() {
  it('Should return false', function() {
    const params = {
      user: {},
      operation: 'CREATE',
      feature: 'feature'
    }

    expect(accessController.check(params)).toBe(true)
  })
})