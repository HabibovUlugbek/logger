import type { ValidationOptions, ValidationArguments } from 'class-validator'
import { ValidateBy, buildMessage } from 'class-validator'
import { isCode } from '@validators'
import type { IsCodeOptions } from '@interfaces'

export const IsCode = (options?: IsCodeOptions, validationOptions?: ValidationOptions): PropertyDecorator =>
  ValidateBy({
    name: 'IsCode',
    validator: {
      validate: (value: unknown, args?: ValidationArguments): boolean => isCode(value, args?.constraints[0]),
      defaultMessage: buildMessage(
        (each: string): string => each + 'The value of $property has the incorrect format.',
        validationOptions,
      ),
    },
    constraints: [options],
  })
