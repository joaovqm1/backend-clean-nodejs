import lodash from 'lodash'

import { DateUtilities, ObjectUtilities } from '@/data/contracts'

export class ObjectUtilitiesImpl implements ObjectUtilities {
  constructor(private readonly dateUtilities: DateUtilities) { }

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

  cloneObject(object: any): any {
    return lodash.cloneDeep(object)
  }

  setNumberPrecision(number: number, precision: number = 4): number {
    return parseFloat(number?.toFixed(precision))
  }
}
