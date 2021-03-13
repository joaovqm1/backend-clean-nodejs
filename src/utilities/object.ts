import lodash from 'lodash'
import * as stringSimilarity from 'string-similarity'

import { DateUtilities, ObjectUtilities } from '@/data/contracts'

export class ObjectUtilitiesImpl implements ObjectUtilities {
  constructor(private readonly dateUtilities: DateUtilities) {}

  isDate(object: any): boolean {
    if (
      this.isString(object) &&
      object.indexOf('-') === -1 &&
      object.indexOf('/') === -1
    ) {
      return false
    } else if (this.isNumber(object)) {
      return false
    } else {
      return this.dateUtilities.isValidDate(object)
    }
  }

  isObject(object: any): boolean {
    if (object === undefined) {
      return false
    }

    return (
      typeof object === 'object' &&
      !Array.isArray(object) &&
      !this.isDate(object)
    )
  }

  isNumber(object: any): boolean {
    return typeof object === 'number'
  }

  isString(object: any): boolean {
    return typeof object === 'string'
  }

  getRandomString(
    size = 12,
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  ): string {
    let string = ''
    const numberOfCharacters = characters.length
    for (let i = 0; i < size; i++) {
      string += characters.charAt(
        Math.floor(Math.random() * numberOfCharacters)
      )
    }
    return string
  }

  cloneObject(object: any): any {
    return lodash.cloneDeep(object)
  }

  stringsAreSimilar(string1: string, string2: string, limiar = 0.95): boolean {
    if (
      stringSimilarity.compareTwoStrings(
        string1.toLowerCase(),
        string2.toLowerCase()
      ) > limiar
    ) {
      return true
    } else {
      return false
    }
  }

  setNumberPrecision(number: number, precision: number = 4): number {
    if (number) {
      return parseFloat(number.toFixed(precision))
    } else {
      return undefined
    }
  }
}
