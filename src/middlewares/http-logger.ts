import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export interface MyResponse extends Omit<Response, 'end'> {
  end: (data: string | Buffer | Uint8Array, encoding: string) => void
}

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: MyResponse, next: NextFunction) {
    const rawResponse: typeof res.write = res.write
    const rawResponseEnd: typeof res.end = res.end
    let chunkBuffers: Array<Buffer> = []

    res.write = (...chunks) => {
      const resArgs: Array<Buffer> = []
      for (let i = 0; i < chunks.length; i++) {
        if (chunks[i]) resArgs[i] = Buffer.from(chunks[i])
        if (!chunks[i]) {
          res.once('drain', res.write)
          --i
        }
      }
      if (Buffer.concat(resArgs)?.length) {
        chunkBuffers = [...chunkBuffers, ...resArgs]
      }

      return rawResponse.apply(res, [resArgs, 'utf8'])
    }

    res.end = (...chunks) => {
      const resArgs: Array<Buffer> = []
      for (let i = 0; i < chunks.length; i++) {
        if (chunks[i]) resArgs[i] = Buffer.from(chunks[i])
      }

      if (Buffer.concat(resArgs)?.length) {
        chunkBuffers = [...chunkBuffers, ...resArgs]
      }

      const body = Buffer.concat(chunkBuffers).toString('utf8')

      console.log(
        JSON.stringify({
          log: 'REQ',
          time: new Date(),
          epoch: Math.floor(Date.now() / 1000),
          originalUrl: req.originalUrl,
          method: req.method,
          params: req.params,
          query: req.query,
          body: req.body,
        }),
      )

      const responseLog = {
        response: {
          statusCode: res.statusCode,
          body: body || JSON.parse(body) || {},
          headers: res.getHeaders(),
        },
      }

      if (res.statusCode < 300) {
        console.log(
          JSON.stringify({
            log: 'RES',
            code: res.statusCode,
            time: new Date(),
            epoch: Math.floor(Date.now() / 1000),
            originalUrl: req.originalUrl,
            method: req.method,
            params: req.params,
            query: req.query,
            body,
          }),
        )
      }

      if (res.statusCode >= 300) {
        console.error(
          JSON.stringify({
            log: 'RES',
            code: res.statusCode,
            time: new Date(),
            epoch: Math.floor(Date.now() / 1000),
            originalUrl: req.originalUrl,
            method: req.method,
            params: req.params,
            query: req.query,
            body,
          }),
        )
      }

      rawResponseEnd.apply(res, [resArgs.toString(), 'utf8'])
      return responseLog as unknown as Response
    }

    if (next) {
      next()
    }
  }
}
