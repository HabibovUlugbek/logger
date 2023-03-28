import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class RpcLoggingInterceptor implements NestInterceptor {
  private logger: Logger = new Logger('CommandLogger')

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now()
    const payload = context.getArgs()
    const pattern = context.getHandler().name
    return next.handle().pipe(
      tap((data) => {
        const elapsed = Date.now() - now
        const logData = {
          command: pattern,
          payload: payload[0],
          response: data,
          begin_date: new Date(now).toISOString(),
          end_date: new Date().toISOString(),
          elapsed_time: `${elapsed}ms`,
        }
        this.logger.log(JSON.stringify(logData))
      }),
    )
  }
}
