import { Controller, Get, Post, Render, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Public } from './decorator/customize';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService
    ) {}

  @UseGuards(LocalAuthGuard)
  @Post(['/admins/login','/customers/login'])
  handleLogin(@Request() req) {
    let result = this.authService.login(req.user._doc);
    console.log(result);
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
