import { Body, Controller, Get, Post, Query, Redirect, Req, Res, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import { Express, query } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth-services/auth.service';
import { Response } from 'express';
import { JwtAuthGuard } from './auth-guard/jwt-guard.guard';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/services/users.service';
import { AccessTokenMiddleware } from '../access-token-middleware/access-token.middleware'
import * as jwt from 'jsonwebtoken';
import { GoogleAuthGuard } from './auth-guard/Google-Guard';

@Controller('auth')
export class AuthControlers {
    constructor (private readonly UsersService : UsersService, private readonly AuthService : AuthService){}
    
    @Get('intra')
    @UseGuards(AuthGuard('42'))
    getUser(){}

    @Get('google')
    @UseGuards(GoogleAuthGuard)
    Google(){}
    
    @Get('intra/callback')
    @UseGuards(AuthGuard('42'))
    async loginsuccess(@Req() req, @Res() res : Response){
        console.log('saasasasas');
        const found = await this.UsersService.findOneUser(req.user);
        if (!found)
            this.UsersService.createUser(req.user);
        const token = await this.AuthService.generateJwtToken(req.user);
        res.cookie('access_token', token, { httpOnly: true, secure : true});
        const RefreshToken = await this.AuthService.generateRefreshJwtToken(req.user);
        this.UsersService.updateUser(req.user.email, {RefreshToken : RefreshToken});
        res.cookie('refresh_token', RefreshToken, { httpOnly: true, secure : true});
        res.cookie('isAuthenticated', true, {secure : true});
        if (found)
            res.redirect(process.env.FrontIp);
        else 
            res.redirect(process.env.FrontIp + '/settings');
    }

    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    async GoogleAuth(@Req() req, @Res() res)
    {
        const found = await this.UsersService.findOneUser(req.user);
        if (!found)
        {
            console.log(req.user);
            this.UsersService.createUser(req.user);
        }
        const token = await this.AuthService.generateJwtToken(req.user);
        res.cookie('access_token', token, { httpOnly: true });
        const RefreshToken = await this.AuthService.generateRefreshJwtToken(req.user);
        // this.UsersService.updateUser(req.user.email, {RefreshToken : RefreshToken});
        res.cookie('refresh_token', RefreshToken, { httpOnly: true, secure : true});
        res.cookie('isAuthenticated', true, {secure : true});
        if (found)
            res.redirect(process.env.FrontIp);
        else 
            res.redirect(process.env.FrontIp + '/settings');
    }

    @Get('refresh')
    async refreshToken(@Req() req, @Res() res){
        const refreshToken = req.cookies['refresh_token'];
        try {
            const payload = await this.AuthService.getUserFromRefreshToken(refreshToken);
            const user = await this.UsersService.ReturnOneUser(payload);
            const accessToken = await this.AuthService.generateJwtToken(user);
            res.cookie('access_token', accessToken, { httpOnly: true });
            res.json(accessToken);
      
          } catch (err) {
            throw new UnauthorizedException('Invalid refresh token');
          }
    }

    @Get('logout')
    async logoutFunction(@Res() res)
    {
        this.AuthService.logout(res);
    }

    @Get('ok')
    @UseGuards(JwtAuthGuard)
    test(@Req() req)
    {
        return 'req.user';
    }

    @Get('enable-2fa')
    enable2FA()
    {

    }
}