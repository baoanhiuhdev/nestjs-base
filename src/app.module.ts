import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { AppLoggerMiddleware } from './utils/logger.middleware';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    // Config .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Passport
    PassportModule,

    // Cronjob
    ScheduleModule.forRoot(),

    // Config mongoose
    // MongooseModule.forRoot(getMongoUrl(), {
    //   autoIndex: true,
    //   autoCreate: true,
    // }),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      autoIndex: true,
      autoCreate: true,
    }),

    // Common Module
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
