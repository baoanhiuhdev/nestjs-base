import { HttpException, Injectable } from '@nestjs/common';

export interface IResponse {
  message: string;
  statusCode?: number;
}
@Injectable()
export class BaseError {
  statusCode: number;
  data: any;
  message: string;

  constructor({ message, statusCode }: IResponse) {
    this.statusCode = statusCode || 400;
    this.data = null;
    this.message = message;
  }

  error() {
    return new HttpException(
      {
        statusCode: this.statusCode,
        data: this.data,
        message: this.message,
      },
      400,
    );
  }
}
