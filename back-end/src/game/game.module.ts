import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [GameController],
  providers: [GameGateway, GameService, PrismaClient]
})
export class GameModule {}
