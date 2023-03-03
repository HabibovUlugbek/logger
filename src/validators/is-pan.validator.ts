export const isPan = (value: unknown): boolean => {
  if (typeof value !== 'string') {
    return false
  }

  const check = /^[0-9]{16}$/

  if (!check.test(value)) {
    return false
  }

  const digits: number[] = value
    .split('')
    .reverse()
    .map((digit: string): number => Number(digit))

  const checksum: number = digits.reduce(
    (prev: number, curr: number, index: number): number =>
      index % 2 !== 0 ? prev + ((curr *= 2) > 9 ? curr - 9 : curr) : prev + curr,
    0,
  )

  return checksum % 10 === 0
}
