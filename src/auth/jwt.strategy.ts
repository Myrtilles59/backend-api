import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {UserService} from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(cfg: ConfigService, private usersService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: cfg.get('JWT_SECRET'),
        });
    }

    async validate(payload: any) {
        const user = await this.usersService.findById(payload.sub);
        if (!user) {
            throw new UnauthorizedException();
        }
        return {userId: user.id, role: user.role};
    }
}