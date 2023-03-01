import { ValidateBy, buildMessage } from 'class-validator'
import type { ValidationOptions } from 'class-validator'
import { isPan } from '@validators'

export const IsPan = (options?: ValidationOptions): PropertyDecorator =>
  ValidateBy({
    name: 'IsPan',
    validator: {
      validate: (value: unknown): boolean => isPan(value),
      defaultMessage: buildMessage(
        (each: string): string => each + 'The value of $property has the incorrect format.',
        options,
      ),
    },
  })
