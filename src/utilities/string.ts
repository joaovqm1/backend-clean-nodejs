import * as stringSimilarity from 'string-similarity'

import { StringUtilities } from '@/data/contracts'

export class StringUtilitiesImpl implements StringUtilities {
  removeSpecialCharactersFromString(string: string = ''): string {
    const newString = string.replace(/[/().-]+/g, '')
    return this.removeWhiteSpace(newString)
  }

  removeWhiteSpace(string: string): string {
    return string.replace(/\s/g, '')
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
}
