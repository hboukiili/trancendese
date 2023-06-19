import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth-guard/jwt-guard.guard';
import { UsersService } from '../services/users.service';
import {UserDTO, GamesDTO, AllGames, topPlayers} from '../dto/dto-classes'
@Controller('')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private readonly UserService : UsersService){}

}
