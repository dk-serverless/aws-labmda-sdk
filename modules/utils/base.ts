export const oKeys = <T>(v: T) => Object.keys(v)
export const oValues = <T>(v: T) => Object.values(v)
export const oEntries = <T>(v: T) => Object.entries(v)
export const oAssigns = <T>(v: T, source: any[]) => Object.assign(v, source)

export interface Dictionary<T> {
  [x: string]: T
}
