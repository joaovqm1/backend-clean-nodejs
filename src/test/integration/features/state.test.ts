import request from 'supertest'

import { UtilitiesFactory } from '@/main/factories/utilities'
import app from '@/main/config/app'
import {
  checkReceivedObjectEqualsExpected
} from '@/test/utilities/checker'
import { ReadStateResponseViewModel } from '@/presentation'

const objectUtilities = UtilitiesFactory.getObject()

describe('State', function() {
  describe('Read', function() {
    it('Should receive a list of states', async function(done) {
      // Act
      const response = await request(app)
        .get('/api/crud/states')
        .send()

      const receivedViewModels: ReadStateResponseViewModel[] = response.body.data.items

      // Assert
      expect(response.status).toBe(200)

      const expectedViewModel: ReadStateResponseViewModel = {
        id: 1,
        name: 'MINAS GERAIS',
        initials: 'MG'
      }

      checkReceivedObjectEqualsExpected({
        receivedObject: receivedViewModels.find(viewModel => viewModel.id === expectedViewModel.id),
        expectedObject: expectedViewModel
      })
      done()
    })
  })
})
