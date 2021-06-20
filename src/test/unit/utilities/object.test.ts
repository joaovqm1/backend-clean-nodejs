import sinon from 'sinon'
import lodash from 'lodash'
import * as stringSimilarity from 'string-similarity'

import { ObjectUtilitiesImpl, DateUtilitiesImpl } from '@/utilities'

afterEach(function() {
  sinon.restore()
})

describe('Utilities - Object Manager', function() {
  const dateUtilities = new DateUtilitiesImpl()
  const objectManager = new ObjectUtilitiesImpl(dateUtilities)

  it('Should certify object', function() {
    expect(objectManager.isObject({ nome: 'teste' })).toEqual(true)
  })

  it('Should reject object', function() {
    const date = new Date(1993, 5, 9).toISOString().split('T')[0]

    expect(objectManager.isObject(date)).toEqual(false)
  })

  it('Should reject object array', function() {
    const array = [{ nome: 'teste' }]

    expect(objectManager.isObject(array)).toEqual(false)
  })

  it('Should reject undefined param', function() {
    expect(objectManager.isObject(undefined)).toEqual(false)
  })

  it('Should certify number', function() {
    expect(objectManager.isNumber(10)).toEqual(true)
  })

  it('Should reject number', function() {
    expect(objectManager.isNumber({ field: 10 })).toEqual(false)
    expect(objectManager.isNumber('string')).toEqual(false)
  })

  it('Should certify string', function() {
    expect(objectManager.isString('string')).toEqual(true)
  })

  it('Should reject string', function() {
    expect(objectManager.isString(10)).toEqual(false)
    expect(objectManager.isString({ field: 'string' })).toEqual(false)
  })

  it('Should certify date', function() {
    const date = new Date(1993, 5, 9).toISOString().split('T')[0]

    expect(objectManager.isDate(date)).toEqual(true)
  })

  it('Should reject date', function() {
    sinon.stub(objectManager, 'isNumber').withArgs(10).returns(true)
    sinon.stub(objectManager, 'isString').withArgs('string').returns(true)

    expect(objectManager.isDate(10)).toEqual(false)
    expect(objectManager.isDate('string')).toEqual(false)
  })

  it('Should clone object', function() {
    sinon.stub(lodash, 'cloneDeep').withArgs({ nome: 'Vitas' }).returns({ nome: 'Vitas' })

    expect(objectManager.cloneObject({ nome: 'Vitas' })).toEqual({ nome: 'Vitas' })
  })
})
