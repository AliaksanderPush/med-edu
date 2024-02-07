import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TokenModule } from './tokens/tokens.module';
import { AuthModule } from './auth/auth.module';
import { BlacklistModule } from './blacklist/blacklist.module';
import { ScheduleModule } from '@nestjs/schedule';
import { HelperModule } from './helper/helper.module';
import { VerificationModule } from './verification/verification.module';
import { UserinfoModule } from './userinfo/userinfo.module';
import { TrimMiddleware } from './core/middlewares/Trim.middleware';
import { LoggingMiddleware } from './core/middlewares/Logging.middleware';
import { PrismaModule } from './core/prisma/prisma.module';
import { ConvertQueryToNumberMiddleware } from './core/middlewares/ConvertSkipTake.middleware';
import { SessionModule } from './session/session.module';
import { SlotModule } from './slot/slot.module';
import { FeedbackModule } from './feedback/feedback.module';
import { QuestionModule } from './question/question.module';
import { IncompleteFeedbackModule } from './incomplete-feedback/incomplete-feedback.module';
import { MailReportModule } from './mail-report/mail-report.module';
import { ManagerSlotModule } from './manager-slot/manager-slot.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true,
    }),
    UserModule,
    TokenModule,
    AuthModule,
    PrismaModule,
    VerificationModule,
    BlacklistModule,
    HelperModule,
    UserinfoModule,
    SessionModule,
    SlotModule,
    FeedbackModule,
    QuestionModule,
    IncompleteFeedbackModule,
    MailReportModule,
    ManagerSlotModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TrimMiddleware, ConvertQueryToNumberMiddleware, LoggingMiddleware).forRoutes('*');
  }
}
