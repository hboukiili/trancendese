import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';
import { AccessTokenMiddleware } from 'src/access-token-middleware/access-token.middleware';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})

export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AccessTokenMiddleware)
      .forRoutes('*');
  }
}
