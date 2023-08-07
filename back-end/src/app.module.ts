import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GameModule } from './game/game.module';
import { AuthModule } from './auth/auth.module';
import * as cookieParser from 'cookie-parser';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MessagesModule } from './chat/messages.module';



@Module({
  imports: [GameModule, MessagesModule, AuthModule, UsersModule, ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'uploads'),
    serveRoot: '/uploads',
  }),],
  controllers: [],
  providers: [],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cookieParser())
      .forRoutes('*');
  }
}

