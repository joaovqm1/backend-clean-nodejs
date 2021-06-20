export interface Storage {
  upload: (params: { path: string, key?: string, tempFile?: boolean }) => Promise<string>
  remove: (key: string) => Promise<string>
}
