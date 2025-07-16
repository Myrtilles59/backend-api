import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {Product} from './entities/product.entity';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product) private repo: Repository<Product>,
    ) {
    }

    findAll() {
        return this.repo.find();
    }

    findOne(id: number) {
        return this.repo.findOne({where: {id}});
    }
}