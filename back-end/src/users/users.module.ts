import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controlers/users.controller';
import { AccessTokenMiddleware } from 'src/access-token-middleware/access-token.middleware';
import { ProfileController } from './controlers/profile.controller';
import { HomeController } from './controlers/home.controller';
import { ProfileService } from './services/profile.service';
import { HomeService } from './services/home.service';

@Module({
  providers: [UsersService, ProfileService, HomeService],
  controllers: [UsersController, ProfileController, HomeController],
  exports: [UsersService]
})

export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AccessTokenMiddleware)
      .forRoutes('*');
  }
}
