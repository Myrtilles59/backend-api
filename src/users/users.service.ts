import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateProfileDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const password = await bcrypt.hash(dto.password, 1)
    

    const user = this.userRepo.create({
      ...dto,
      password: password,
    });
    return this.userRepo.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepo.findOne({ where: { id } });
  }

async updateUser(id: number, dto: UpdateProfileDto): Promise<User> {
  const user = await this.userRepo.findOneByOrFail({ id });

  user.firstName = dto.firstName!!;
  user.lastName = dto.lastName!!;
  user.address = dto.address!!;
  user.email = dto.email!!;
  user.phoneNumber = dto.phoneNumber!!;
  user.role = dto.role!!;

  if (dto.password && dto.password != user.password && dto.password.trim() !== '') {
    user.password = await bcrypt.hash(dto.password, 10);
  }
  return this.userRepo.save(user);

}
  

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }
}
