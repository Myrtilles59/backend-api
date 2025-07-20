import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Utilisateur non trouvé');

    const passwordMatch = await bcrypt.compare(pass, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Mot de passe incorrect');

    return user;
  }

  async login(user: User) {
    return {
      user
    };
  }
}
