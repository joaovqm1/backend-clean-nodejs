import { TypeUtilities } from '@/data'

export class TypeUtilitiesImpl implements TypeUtilities {
  getTheDefinedValue<T>(value1: T, value2: T): T {
    return value1 || value2
  }

  getStringValueOrEmptyString(string: string): string {
    return string || ''
  }
}
