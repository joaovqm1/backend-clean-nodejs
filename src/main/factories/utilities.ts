import {
  DateUtilities,
  ObjectUtilities,
  StringUtilities,
  FilterTransformer,
  FileUtilities,
  HttpRequest,
} from '@/data/contracts'
import {
  DateUtilitiesImpl,
  ObjectUtilitiesImpl,
  StringUtilitiesImpl,
  FileUtilitiesImpl,
  FilterTransformerImpl,
  HttpRequestImpl,
} from '@/utilities'

import { serverConfig } from '@/config'

export class UtilitiesFactory {
  static getDate(): DateUtilities {
    return new DateUtilitiesImpl()
  }

  static getFile(): FileUtilities {
    return new FileUtilitiesImpl()
  }

  static getObject(): ObjectUtilities {
    return new ObjectUtilitiesImpl(UtilitiesFactory.getDate())
  }

  static getString(): StringUtilities {
    return new StringUtilitiesImpl()
  }

  static getRequest(url: string = serverConfig.url): HttpRequest {
    return new HttpRequestImpl(url)
  }

  static getFilterTransformer(): FilterTransformer {
    return new FilterTransformerImpl()
  }
}

export const objectUtilities = UtilitiesFactory.getObject()
export const dateUtilities = UtilitiesFactory.getDate()
export const stringUtilities = UtilitiesFactory.getString()
export const fileUtilities = UtilitiesFactory.getFile()
