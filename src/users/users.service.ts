import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {User} from './entities/user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateUserDto} from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {
    }

    create(dto: CreateUserDto) {
        const user = this.repo.create(dto);
        return this.repo.save(user);
    }

    findByEmail(email: string) {
        return this.repo.findOne({where: {email}});
    }

    findById(id: number) {
        return this.repo.findOne({where: {id}});
    }
}