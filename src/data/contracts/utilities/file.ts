export interface FileUtilities {
  get: (path: string) => string
  getJSON: (path: string) => any
  getFilesFromDir: (dir: string) => string[]
  getReadStream: (path: string) => any
  create: (path: string, data: string) => void
  remove: (path: string) => void
  exists: (path: string) => boolean
}
