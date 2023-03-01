import { parse, parseISO } from 'date-fns'
import type { IsDateOptions } from '@interfaces'

export const isDate = (value: unknown, options?: IsDateOptions): boolean => {
  const date = new Date()

  if (typeof value !== 'string') {
    return false
  }

  if (options && options.format) {
    return parse(value, options.format, date).toString() !== 'Invalid Date'
  }

  return parseISO(value).toString() !== 'Invalid Date'
}
