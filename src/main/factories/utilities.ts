import { serverConfig } from '@/config'
import {
  DateUtilities,
  FileUtilities,
  HTMLMounter,
  HttpRequest,
  ObjectUtilities,
  StringUtilities,
  TypeUtilities,
} from '@/data/contracts'
import {
  DateUtilitiesImpl,
  FileUtilitiesImpl,
  HTMLMounterImpl,
  HttpRequestImpl,
  ObjectUtilitiesImpl,
  StringUtilitiesImpl,
  TypeUtilitiesImpl,
} from '@/utilities'

export class UtilitiesFactory {
  static getDate(): DateUtilities {
    return new DateUtilitiesImpl()
  }

  static getFile(): FileUtilities {
    return new FileUtilitiesImpl()
  }

  static getHTMLMounter(dateUtilities: DateUtilities, fileUtilities: FileUtilities): HTMLMounter {
    return new HTMLMounterImpl({ dateUtilities, fileUtilities })
  }

  static getObject(): ObjectUtilities {
    return new ObjectUtilitiesImpl(UtilitiesFactory.getDate())
  }

  static getString(): StringUtilities {
    return new StringUtilitiesImpl()
  }

  static getType(): TypeUtilities {
    return new TypeUtilitiesImpl()
  }

  static getRequest(url: string = serverConfig.url): HttpRequest {
    return new HttpRequestImpl(url)
  }
}

export const objectUtilities = UtilitiesFactory.getObject()
export const dateUtilities = UtilitiesFactory.getDate()
export const stringUtilities = UtilitiesFactory.getString()
export const typeUtilities = UtilitiesFactory.getType()
export const fileUtilities = UtilitiesFactory.getFile()
export const htmlMounter = UtilitiesFactory.getHTMLMounter(dateUtilities, fileUtilities)
