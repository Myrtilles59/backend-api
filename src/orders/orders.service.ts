import {Injectable, NotFoundException} from '@nestjs/common';
import {Repository} from 'typeorm';
import {Order} from './entities/order.entity';
import {OrderItem} from './entities/order-item.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateOrderDto} from './dto/create-order.dto';
import {QrCodeFactory} from '../shared/factories/qr-code.factory';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order) private orderRepo: Repository<Order>,
        @InjectRepository(OrderItem) private itemRepo: Repository<OrderItem>,
        private qrFactory: QrCodeFactory,
    ) {
    }

    async create(userId: number, dto: CreateOrderDto) {
        const order = this.orderRepo.create({user: {id: userId} as any, total: dto.total, status: 'pending'});
        order.items = dto.items.map(i =>
            this.itemRepo.create({productId: i.productId, quantity: i.quantity, price: 0}),
        );
        const saved = await this.orderRepo.save(order);
        const qrUrl = await this.qrFactory.generate(saved.id);
        saved.qrCodeUrl = qrUrl;
        return this.orderRepo.save(saved);
    }

    findActive() {
        return this.orderRepo.find({where: {status: 'pending'}});
    }

    async confirmPickup(id: number) {
        const order = await this.orderRepo.findOne({where: {id}});
        if (!order) throw new NotFoundException('Order not found');
        order.status = 'picked_up';
        order.pickedUpAt = new Date();
        return this.orderRepo.save(order);
    }

    findQr(id: number) {
        return this.orderRepo.findOne({where: {id}, select: ['qrCodeUrl']});
    }
}