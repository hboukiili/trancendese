import { Body, Controller, Get, Post, Query, Redirect, Req, Res, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import { Express, query } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth-services/auth.service';
import { Response } from 'express';
import { JwtAuthGuard } from './auth-guard/jwt-guard';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/services/users.service';
import { AccessTokenMiddleware } from '../access-token-middleware/access-token.middleware'
import * as jwt from 'jsonwebtoken';
import { GoogleAuthGuard } from './auth-guard/Google-Guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
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
        const found = await this.UsersService.findOneUser(req.user);
        if (!found)
            this.UsersService.createUser(req.user);
        const token = await this.AuthService.generateJwtToken(req.user);
        const RefreshToken = await this.AuthService.generateRefreshJwtToken(req.user);
        res.cookie('access_token', token, { httpOnly: true, secure : true});
        res.cookie('refresh_token', RefreshToken, { httpOnly: true, secure : true});
        res.cookie('isAuthenticated', true, {secure : true});
        if (found)
        {
            res.redirect(process.env.FrontIp);
        }
        else 
            res.redirect(process.env.FrontIp + '/settings');
    }

    @Get('WsToken')
    @UseGuards(JwtAuthGuard)
    async getWsToken(@Req() req)
    {
        const token = await this.AuthService.generateJwtToken(req.user);
        return token;
    }

    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    async GoogleAuth(@Req() req, @Res() res)
    {
        const found = await this.UsersService.findOneUser(req.user);
        if (!found)
            this.UsersService.createUser(req.user);
        const token = await this.AuthService.generateJwtToken(req.user);
        const RefreshToken = await this.AuthService.generateRefreshJwtToken(req.user);
        res.cookie('access_token', token, { httpOnly: true });
        res.cookie('refresh_token', RefreshToken, { httpOnly: true, secure : true});
        res.cookie('isAuthenticated', true, {secure : true});
        if (found)
            res.redirect(process.env.FrontIp);
        else 
            res.redirect(process.env.FrontIp + '/settings');
    }

    @Get('refresh')
    async refreshToken(@Req() req, @Res() res){
        var RefreshToken = req.cookies['refresh_token'];
        try {
            const payload = await this.AuthService.getUserFromRefreshToken(RefreshToken);
            const user = await this.UsersService.ReturnOneUser(payload);
            const accessToken = await this.AuthService.generateJwtToken(user);
            RefreshToken = await this.AuthService.generateRefreshJwtToken(user);
            res.cookie('refresh_token', RefreshToken, { httpOnly: true, secure : true});
            res.cookie('access_token', accessToken, { httpOnly: true, secure : true });
            const wsToken = await this.AuthService.generateJwtToken(user);
            res.json(wsToken);
          } catch (err) {
            throw new UnauthorizedException('Invalid refresh token');
          }
    }

    @Get('logout')
    async logoutFunction(@Res() res)
    {
        this.AuthService.logout(res);
    }

    @Get('enable-2fa')
    @UseGuards(JwtAuthGuard)
    async enable2FA(@Req() req, @Res() res)
    {
        const qrcode = await this.AuthService.GenerateQrCode(req.user);
        res.send(qrcode);
    }

    @Post("verify-2fa")
    @ApiBody({ 
        schema: {
          type: 'object',
          properties: {
            Code: {
              type: 'string',
            },
          },
        },
    })
    @UseGuards(JwtAuthGuard)
    async verify2fa(@Body("Code") FaCode : string, @Req() req)
    {
        return await this.AuthService.checkvaliditionof2fa(req.user, FaCode);
    }

    @Get("isFA-enabled")
    @UseGuards(JwtAuthGuard)
    async isFa_enabled(@Req() req)
    {
       return await this.UsersService.checkFaIsEnabled(req.user);
    }

    @Post('isFA-enabled')
    @UseGuards(JwtAuthGuard)
    async isFAenabled(@Req() req)
    {
        await this.AuthService.disableFA(req.user);
    }
}