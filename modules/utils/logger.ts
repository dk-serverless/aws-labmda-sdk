/**
 * @param logger console.log
 * @param value value
 * @returns
 */
export const loggerAfterReturnValue = (logger: Function, value: unknown) => {
  logger(value)
  return value
}
