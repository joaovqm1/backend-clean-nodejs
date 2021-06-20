export interface TypeUtilities {
  getTheDefinedValue: <T>(value1: T, value2: T) => T
  getStringValueOrEmptyString: (string: string) => string
}
