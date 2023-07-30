import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { RoomsController } from './messages.controller';
import { PrismaClient } from '@prisma/client';
import { ChatGateway } from './messages.gateway';

@Module({
  providers: [MessagesService, PrismaClient, ChatGateway],
  controllers: [RoomsController]
})
export class MessagesModule {}