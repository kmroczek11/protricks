import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import * as fs from 'fs';
import { GraphQLResolveInfo } from 'graphql';
import {
  CustomHttpExceptionResponse,
  HttpExceptionResponse,
} from './models/http-exception-response.interface';

@Catch()
export class AllExceptionsFilter implements GqlExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = GqlArgumentsHost.create(host);

    let status: HttpStatus;
    let errorMessage: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();
      errorMessage =
        (errorResponse as HttpExceptionResponse).error || exception.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = 'Critical internal server error occurred!';
    }

    const error = this.getErrorResponse(status, errorMessage, ctx);

    const errorLog = this.getErrorLog(error, exception, ctx);

    this.writeErrorLogToFile(errorLog);

    return exception;
  }

  private getErrorResponse = (
    status: HttpStatus,
    errorMessage: string,
    ctx: GqlArgumentsHost,
  ): CustomHttpExceptionResponse => ({
    statusCode: status,
    error: errorMessage,
    info: ctx.getInfo<GraphQLResolveInfo>(),
    rawArgs: JSON.stringify(ctx.getArgs()),
    timeStamp: new Date(),
  });

  private getErrorLog = (
    errorResponse: CustomHttpExceptionResponse,
    exception: unknown,
    ctx: GqlArgumentsHost,
  ): string => {
    const { statusCode, error } = errorResponse;
    const errorLog = `Response Code: ${statusCode}\n\n
    ${JSON.stringify(errorResponse)}\n\n
    User: ${JSON.stringify(ctx.getContext().req.user ?? 'Not signed in')}\n\n
    ${exception instanceof HttpException ? exception.stack : error}\n\n`;
    return errorLog;
  };

  private writeErrorLogToFile = (errorLog: string): void => {
    fs.appendFile('error.log', errorLog, 'utf8', (err) => {
      if (err) throw err;
    });
  };
}
