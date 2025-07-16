import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {OrdersService} from './orders.service';
import {OrdersController} from './orders.controller';
import {Order} from './entities/order.entity';
import {OrderItem} from './entities/order-item.entity';
import {QrCodeFactory} from '../shared/factories/qr-code.factory';
import {UsersModule} from '../users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([Order, OrderItem]), UsersModule],
    providers: [OrdersService, QrCodeFactory],
    controllers: [OrdersController],
})
export class OrdersModule {
}