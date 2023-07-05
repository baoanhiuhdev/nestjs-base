import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ethers } from 'ethers';
import { BaseError } from './base-error';

@Injectable()
export class VerifySignatureInterceptor implements NestInterceptor {
  constructor() { }

  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const signature = request.headers['x-signature'];
    if (!signature) {
      throw new BaseError({ message: 'Missing signature header', statusCode: HttpStatus.BAD_REQUEST })
    }

    try {
      const recoveredAddress = ethers.verifyMessage(
        process.env.SIGN_DATA,
        signature,
      );
      request.recoveredAddress = recoveredAddress;

    } catch (err) {
      throw new BaseError({ message: 'Invalid signature', statusCode: HttpStatus.UNAUTHORIZED })
    }

    return next.handle();
  }
}

export function VerifySignature(): MethodDecorator {
  return (
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const result = originalMethod.apply(this, args);
      if (result instanceof Promise) {
        return result
          .then((data) => {
            return data;
          })
          .catch((error) => {
            throw error;
          });
      }
      return result;
    };

    return UseInterceptors(new VerifySignatureInterceptor())(
      target,
      key,
      descriptor,
    );
  };
}