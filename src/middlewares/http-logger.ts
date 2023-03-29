import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'

@Injectable()
export class HttpLoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const { method, originalUrl, body } = request
    return next.handle().pipe(
      tap((data) => {
        const { statusCode } = context.switchToHttp().getResponse()
        const elapsedTime = Date.now() - request.startAt
        const log = {
          method,
          originalUrl,
          body,
          statusCode,
          res: data,
          elapsedTime,
        }
        console.log(log)
      }),
      catchError((error) => {
        const elapsedTime = Date.now() - request.startAt
        const log = {
          method,
          originalUrl,
          body,
          res: error.message,
          elapsedTime,
        }
        console.log(log)
        throw error
      }),
    )
  }
}
