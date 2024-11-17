import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

// Los filters ayudan a mejorar mmensajes de error al fallar una petición

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        // intentamos extraer los detaller especificos del mensaje error
        const exceptionResponse: any = exception.getResponse();
        const message =
            exceptionResponse.message instanceof Array
                ? exceptionResponse.message
                : [exception.menssage];

        // aqui implementamos el mensaje de error personalizado:
        response.status(status).json({
            statusCode: status,
            message: message.length > 0 ? message : exception.message,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}