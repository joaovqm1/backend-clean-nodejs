import * as stringSimilarity from 'string-similarity'
import sinon from 'sinon'

import { StringUtilitiesImpl } from '@/utilities'

afterEach(function() {
  sinon.restore()
})

describe('Utilities - String Manager', function() {
  const stringManager = new StringUtilitiesImpl()

  it('Should certify object', function() {
    expect(stringManager.removeSpecialCharactersFromString('str/ing()')).toEqual('string')
  })

  it('Should create a random string', function() {
    sinon.stub(Math, 'random').withArgs().returns(0)

    expect(stringManager.getRandomString(5, 'abed0')).toEqual('aaaaa')
  })

  it('Should confirm string similarity', function() {
    sinon.stub(stringSimilarity, 'compareTwoStrings').withArgs('ronaldo', 'Ronaldo').returns(0.83)

    expect(stringManager.stringsAreSimilar('ronaldo', 'Ronaldo', 0.8)).toEqual(true)
  })

  it('Should deny string similarity', function() {
    sinon.stub(stringSimilarity, 'compareTwoStrings').withArgs('porta', 'hipopotamo').returns(0.4)

    expect(stringManager.stringsAreSimilar('porta', 'hipopotamo', 0.8)).toEqual(false)
  })
})
