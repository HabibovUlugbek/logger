import { ValidationPipe } from '@nestjs/common'
import type { ValidationError, ValidationPipeOptions } from '@nestjs/common'
import { UnprocessableEntityException } from '@sello-lab/exceptions'

export class GlobalValidationPipe extends ValidationPipe {
  constructor(options?: Omit<ValidationPipeOptions, 'exceptionFactory'>) {
    super({
      ...options,
      exceptionFactory: (errors: ValidationError[]): UnprocessableEntityException => {
        const details: Record<string, string[]> = {}

        errors.forEach((error: ValidationError): void => {
          if (error.constraints) {
            details[error.property] = Object.values(error.constraints)
          }
        })

        return new UnprocessableEntityException(details)
      },
    })
  }
}
