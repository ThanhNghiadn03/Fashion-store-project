import { Controller, Get, Post, Render, Req, Request, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Public } from './decorator/customize';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
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
  @Get('/admins/profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/customers/profile')
  getProfileCustomer(@Request() req) {
    return req.user;
  }


}
