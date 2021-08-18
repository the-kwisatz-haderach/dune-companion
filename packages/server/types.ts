export interface DataStore<T> {
  persist: (key: string, data: T) => Promise<void>
  get: (key: string) => Promise<T | null>
  remove: (key: string) => Promise<void>
}
