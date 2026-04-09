import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const isHttp = exception instanceof HttpException;

    const status = isHttp
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = isHttp
      ? exception.getResponse()
      : exception;

    console.error('🔥 ERROR:', exception); // FULL ERROR LOG

    response.status(status).json({
      success: false,
      message: isHttp
        ? (errorResponse as any)?.message || 'Http error'
        : (exception as any)?.message || 'Internal Server Error',

      // 👇 VERY IMPORTANT FOR DEBUG
      ...(process.env.NODE_ENV !== 'production' && {
        stack: (exception as any)?.stack,
        error: errorResponse,
      }),
    });
  }
}