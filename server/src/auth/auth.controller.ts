import { Controller, Get, Post, Render, Req, Request, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}
    @UseGuards(LocalAuthGuard)
    @Post(['/admins/login','/customers/login'])
    handleLogin(
    @Req() req,
    @Res({ passthrough: true}) response: Response
    ) {
    let result = this.authService.login(req.user._doc,response);
    return result;
    }

    @UseGuards(JwtAuthGuard)
    @Post(['/admins/logout','/customers/logout'])
    handleLogout(
        @Req() req,
        @Res({ passthrough: true}) response: Response
    ) {
        let result = this.authService.logout(req.user,response);
        return result;
    }

    @UseGuards(JwtAuthGuard)
    @Get('/admins/profile')
    getProfile(@Request() req) {
        console.log(req.user);
    return req.user;
    }

    @UseGuards(JwtAuthGuard)
    @Get('/customers/profile')
    getProfileCustomer(@Request() req) {
        console.log(req.user);
    return req.user;
    }

    @Get('account/refresh')
    handleRefreshAccount(
        @Request() req,
        @Res() response: Response) {
    const refreshToken = req.cookies['refresh_token'];
        console.log(refreshToken);
        return this.authService.processNewToken(refreshToken,response);
    }
}