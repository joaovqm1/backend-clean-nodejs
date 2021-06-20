import request from 'supertest'

import app from '@/main/config/app'
import { checkReceivedObjectEqualsExpected } from '@/test/utilities/checker'
import { ReadBankResponseViewModel } from '@/presentation'

describe('Bank', function() {
  describe('Read', function() {
    it('Should receive a list of banks', async function(done) {
      // Act
      const response = await request(app)
        .get('/api/crud/banks')
        .send()

      const receivedViewModels: ReadBankResponseViewModel[] = response.body.data.items

      // Assert
      expect(response.status).toBe(200)

      const expectedViewModel: ReadBankResponseViewModel = {
        id: 1,
        name: '001 - BANCO DO BRASIL',
        number: '001'
      }

      checkReceivedObjectEqualsExpected({
        receivedObject: receivedViewModels.find(viewModel => viewModel.id === expectedViewModel.id),
        expectedObject: expectedViewModel
      })
      done()
    })
  })
})
