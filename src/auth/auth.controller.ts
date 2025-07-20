import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/register.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Post('signup')
  async signup(@Body() dto: CreateUserDto) {
    const existing = await this.userService.findByEmail(dto.email);
    if (existing) {
      throw new UnauthorizedException('Un compte avec cet email existe déjà');
    }

    const user = await this.userService.create(dto);
    const login = await this.authService.login(user);
    return login;
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    return this.authService.login(user);
  }
}