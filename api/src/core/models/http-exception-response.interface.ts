export interface HttpExceptionResponse {
  statusCode: number;
  error: string;
}

export interface CustomHttpExceptionResponse extends HttpExceptionResponse {
  operationName: string;
  query:string;
  timeStamp: Date;
}
