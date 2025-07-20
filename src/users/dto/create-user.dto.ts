import { IsEmail, IsEnum, IsString } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  address: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  phoneNumber: string;

  @IsEnum(UserRole)
  role: UserRole;
}
