import type { IsCodeOptions } from '@interfaces'

export const isCode = (value: unknown, options?: IsCodeOptions): boolean => {
  if (options?.type === 'string') {
    return typeof value === 'string' && value.length === options.length && /^[A-Za-z0-9]+$/.test(value)
  }

  if (options?.type === 'number') {
    return typeof value === 'number' && value.toString().length === options.length && /^[0-9]+$/.test(value.toString())
  }

  return typeof value === 'string' && /^\w+$/.test(value)
}
