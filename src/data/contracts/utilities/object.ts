export interface ObjectUtilities {
  isDate: (object: any) => boolean
  isObject: (object: any) => boolean
  isNumber: (object: any) => boolean
  isString: (object: any) => boolean
  cloneObject: <T = any>(object: T) => T
  setNumberPrecision: (number: number, precision: number) => number
}
