import {Controller, Get, Request, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    @UseGuards(JwtAuthGuard)
    @Get('me')
    me(@Request() req) {
        return req.user;
    }
}