import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const user = this.userRepo.create({
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
    });
    return this.userRepo.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepo.findOne({ where: { id } });
  }

  async update(id: number, updates: Partial<CreateUserDto>): Promise<boolean> {
    await this.userRepo.update(id, updates);
    return true;
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }
}
