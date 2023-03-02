# Validator for NestJS

### Disclaimer

This is a **private package**, you need an **access token** to install this package. Please contact [me](https://t.me/iaxel) to get an access token.

### Before installation

To install this package, run the following commands:

```bash
$ echo "//registry.npmjs.org/:_authToken=<ACCESS_TOKEN>" > .npmrc
```

## Installation

```bash
$ npm install --save @sello-lab/validator class-validator date-fns reflect-metadata
```

If you want to use `GlobalValidationPipe`, you must install additional packages:

```bash
$ npm install --save @nestjs/common @sello-lab/exceptions
```

## Getting started

### GlobalValidationPipe

You can use `GlobalValidationPipe` in your `main.ts` file to validate all incoming requests.

```ts
// main.ts
import { NestFactory } from '@nestjs/core';
import { GlobalValidationPipe } from '@sello-lab/validator';
import { AppModule } from './app.module';

setImmediate(async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new GlobalValidationPipe({
      transform: true,
      whitelist: true,
      stopAtFirstError: true,
    }),
  );

  await app.listen(3000, '127.0.0.1');
});
```

### Decorators

| Decorator                          | Description                                  |
|------------------------------------|----------------------------------------------|
| `@IsPan()`                         | Checks if the value is a valid PAN number.   |
| `@IsCode(options?: IsCodeOptions)` | Checks if the value is a valid code.         |
| `@IsDate(options?: IsDateOptions)` | Checks if the value is a valid date.         |
| `@IsPhone()`                       | Checks if the value is a valid phone number. |

### Example

```ts
// card-create.dto.ts
import { IsPan, IsCode, IsDate, IsPhone } from '@sello-lab/validator';

export class CardCreateDto {
  @IsPan()
  pan: string;

  @IsCode({
    type: 'number',
    length: 3,
  })
  cvv: number;

  @IsDate({
    format: 'MM/YY',
  })
  expiry: string;

  @IsPhone()
  phone: string;
}
```

```ts
// card.controller.ts
import { Body, Post, Controller } from '@nestjs/common';
import { CardCreateDto } from './card-create.dto';

@Controller('card')
export class CardController {
  @Post()
  create(@Body() card: CardCreateDto): CardCreateDto {
    return card;
  }
}
```

Enjoy!
