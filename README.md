# Logger for NestJS

### Disclaimer

<!-- This is a **private package**, you need an **access token** to install this package. Please contact
[me](https://t.me/iaxel) to get an access token. -->

### Before installation

If you want to use `Logger`, you must install additional packages:

```bash
$ npm install --save @nestjs/common @habibovulugbek/logger
```

## Getting started

### HttpLoggerMiddleware

You can use `HttpLoggerInterceptor` in your `main.ts` file to represent your request ans response.

```ts
// main.ts
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpLoggerInterceptor } from '@habibovulugbek/logger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalInterceptors(new HttpLoggerInterceptor())
  await app.listen(3000)
}
```

### RpcLoggingInterceptor

You can use `RpcLoggingInterceptor` in your `main.ts` file to represent your request ans response.

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
