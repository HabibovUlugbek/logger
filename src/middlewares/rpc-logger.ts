import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common'
import { Observable } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'

@Injectable()
export class RpcLoggingInterceptor implements NestInterceptor {
  private logger: Logger = new Logger('Logger')

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now()
    const payload = context.getArgs()
    const pattern = context.getHandler().name
    return next.handle().pipe(
      tap((data) => {
        const elapsed = Date.now() - now
        const logData = {
          payload: payload[0],
          command: pattern,
          response: data,
          begin_date: new Date(now).toISOString(),
          end_date: new Date().toISOString(),
          elapsed_time: `${elapsed}ms`,
        }
        this.logger.log(JSON.stringify(logData))
      }),
      catchError((error) => {
        const elapsed = Date.now() - now
        const logData = {
          payload: payload[0],
          command: pattern,
          error: error.message,
          begin_date: new Date(now).toISOString(),
          end_date: new Date().toISOString(),
          elapsed_time: `${elapsed}ms`,
        }

        console.log(logData)

        throw error
      }),
    )
  }
}
