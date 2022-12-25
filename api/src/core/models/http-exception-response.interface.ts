import { GraphQLResolveInfo } from 'graphql';

export interface HttpExceptionResponse {
  statusCode: number;
  error: string;
}

export interface CustomHttpExceptionResponse extends HttpExceptionResponse {
  info: GraphQLResolveInfo;
  rawArgs: any;
  timeStamp: Date;
}
