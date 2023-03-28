# Logger for NestJS

### Disclaimer

This is a **private package**, you need an **access token** to install this package. Please contact
[me](https://t.me/iaxel) to get an access token.

### Before installation

To install this package, run the following commands:

```bash
$ echo "//registry.npmjs.org/:_authToken=<ACCESS_TOKEN>" > .npmrc
```

## Installation

```bash
$ npm install --save @habibovulugbek/logger  reflect-metadata
```

If you want to use `Logger`, you must install additional packages:

```bash
$ npm install --save @nestjs/common @habibovulugbek/logger
```

## Getting started

### HttpLoggerMiddleware

You can use `HttpLoggerMiddleware` in your `app.module.ts` file to validate all incoming requests.

```ts
// app.module.ts
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { HttpLoggerMiddleware } from '@habibovulugbek/logger'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*')
  }
}
```

### RpcLoggingInterceptor

You can use `RpcLoggingInterceptor` in your `main.ts` file to validate all incoming requests.

```ts
//main.ts

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { RpcLoggingInterceptor } from '@habibovulugbek/logger'

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 3000,
    },
  })
  app.useGlobalInterceptors(new RpcLoggingInterceptor())
  await app.listenAsync()
}
bootstrap()
```

Enjoy!
