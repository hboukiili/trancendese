import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthControlers } from './auth.controller';
import { AuthProviders } from './auth-providers/auth-providers';
import { intraStrategie } from './auth-services/strategy-service.service'
import { AuthService } from './auth-services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from './auth-services/jwt.service';
import { UsersModule } from 'src/users/users.module';
import { AccessTokenMiddleware } from 'src/access-token-middleware/access-token.middleware';
import { GoogleStrategy } from './auth-services/GoogleStrategy';

@Module({
  controllers: [AuthControlers],
  providers: [AuthProviders, intraStrategie, AuthService, JwtService, GoogleStrategy],
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '15m' },
    }),
    UsersModule],
})

export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AccessTokenMiddleware)
      .forRoutes('enable-2fa');
  }
}