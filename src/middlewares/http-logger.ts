import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common'
import { Observable } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'

@Injectable()
export class HttpLoggerInterceptor implements NestInterceptor {
  private logger: Logger = new Logger('Logger')

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const { method, originalUrl, body } = request
    const startTime = Date.now()
    return next.handle().pipe(
      tap((data) => {
        const { statusCode } = context.switchToHttp().getResponse()
        const elapsed = Date.now() - startTime
        const logData = {
          method,
          originalUrl,
          body,
          statusCode,
          res: data,
          begin_date: new Date(startTime).toISOString(),
          end_date: new Date().toISOString(),
          elapsed_time: `${elapsed}ms`,
        }
        this.logger.log(JSON.stringify(logData))
      }),
      catchError((error) => {
        const elapsed = Date.now() - startTime
        const logData = {
          method,
          originalUrl,
          body,
          res: error.message,
          begin_date: new Date(startTime).toISOString(),
          end_date: new Date().toISOString(),
          elapsed_time: `${elapsed}ms`,
        }
        this.logger.log(JSON.stringify(logData))
        throw error
      }),
    )
  }
}
