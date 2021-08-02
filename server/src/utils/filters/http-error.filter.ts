import { Catch, ExceptionFilter, HttpException, ArgumentsHost, Logger, HttpStatus } from "@nestjs/common";

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const status = exception.getStatus ?  exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const errorReposne = {
            code: status,
            timestamp: new Date().toString(),
            path: request.url,
            method: request.method,
            message: 
                (status !== HttpStatus.INTERNAL_SERVER_ERROR) ?
                exception.message || null : 'Something went wrong!'
        }
        if(status === HttpStatus.INTERNAL_SERVER_ERROR){
            console.error(exception);
        }
        Logger.error(`${request.method} ${request.url}`, JSON.stringify(errorReposne), 'ExecptionFilter');
        response.status(status).send(errorReposne);
    }
}