/* eslint-disable security/detect-non-literal-fs-filename */
import fs, { ReadStream } from 'fs'

import { FileUtilities } from '@/data/contracts'
export class FileUtilitiesImpl implements FileUtilities {
  get(path: string): string {
    return fs.readFileSync(path, 'utf8')
  }

  getJSON(path: string): any {
    const json = this.get(path)
    if (json) {
      return JSON.parse(json)
    } else {
      throw new Error(`Nenhum arquivo encontrado no caminho ${path}`)
    }
  }

  getFilesFromDir(dir: string): string[] {
    return fs.readdirSync(dir, null)
  }

  /* istanbul ignore next */
  getReadStream(path: string): ReadStream {
    return fs.createReadStream(path)
  }

  create(path: string, data: string): void {
    return fs.writeFileSync(path, data)
  }

  remove(path: string): void {
    if (this.exists(path)) {
      fs.unlinkSync(path)
    }
  }

  exists(path: string): boolean {
    return fs.existsSync(path)
  }
}
