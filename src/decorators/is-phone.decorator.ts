import { ValidateBy, buildMessage } from 'class-validator'
import type { ValidationOptions } from 'class-validator'
import { isPhone } from '@validators'

export const IsPhone = (options?: ValidationOptions): PropertyDecorator =>
  ValidateBy({
    name: 'IsPhone',
    validator: {
      validate: (value: unknown): boolean => isPhone(value),
      defaultMessage: buildMessage(
        (each: string): string => each + 'The value of $property has the incorrect format.',
        options,
      ),
    },
  })
