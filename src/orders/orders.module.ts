import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsService } from './orders.service';
import { ReservationsController } from './orders.controller';
import { Reservation } from './entities/reservation.entity';
import { OrderItem } from './entities/order-item.entity';
import { User } from '../users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, OrderItem, User,Product]), ProductsModule],
  providers: [ReservationsService],
  controllers: [ReservationsController],
})
export class ReservationsModule {}