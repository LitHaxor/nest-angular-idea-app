import { Catch, ExceptionFilter, HttpException, ArgumentsHost, Logger } from "@nestjs/common";

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const status = exception.getStatus();
        const errorReposne = {
            code: status,
            timestamp: new Date().toString(),
            path: request.url,
            method: request.method,
            message: exception.message || null
        }
        Logger.error(`${request.method} ${request.url}`, JSON.stringify(errorReposne), 'ExecptionFilter');
        response.status(status).send(errorReposne);
    }
}