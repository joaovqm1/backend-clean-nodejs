export interface StringUtilities {
  getRandomString: (size?: number, characters?: string) => string
  stringsAreSimilar: (
    string1: string,
    string2: string,
    limiar?: number
  ) => boolean
  removeSpecialCharactersFromString: (string: string) => string
  removeWhiteSpace: (string: string) => string
}
