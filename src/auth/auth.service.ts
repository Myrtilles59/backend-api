import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {JwtService} from '@nestjs/jwt';
import {RegisterDto} from './dto/register.dto';
import {LoginDto} from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {
    }

    async register(dto: RegisterDto) {
        const hashed = await bcrypt.hash(dto.password, 10);
        const user = await this.usersService.create({
            ...dto,
            password: hashed,
        });
        const payload = {sub: user.id, role: user.role};
        return {token: this.jwtService.sign(payload)};
    }

    async validateUser(email: string, pass: string) {
        const user = await this.usersService.findByEmail(email);
        if (user && (await bcrypt.compare(pass, user.password))) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(dto: LoginDto) {
        const user = await this.usersService.findByEmail(dto.email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const valid = await bcrypt.compare(dto.password, user.password);
        if (!valid) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = {sub: user.id, role: user.role};
        return {token: this.jwtService.sign(payload)};
    }
}