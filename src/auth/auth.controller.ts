import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import { IsAuth } from './guards/isAuth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() SignUpDto: SignUpDto) {
    return this.authService.signUp(SignUpDto);
  }

  @Post('sign-in')
  signIn(@Body() SignInDto: SignInDto) {
    return this.authService.signIn(SignInDto);
  }

  @Get('current-user')
  @UseGuards(IsAuth)
  getCurrentUser(@Req() req) {
    return this.authService.currentUser(req.userId);
  }
}
