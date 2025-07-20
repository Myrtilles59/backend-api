import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { ReservationStatus } from './enums/reservation-statuts.enum';
import { CreateReservationDto } from './dto/create-order.dto';
import { User } from '../users/entities/user.entity';
import { OrderItem } from './entities/order-item.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class ReservationsService {
constructor(
  @InjectRepository(Reservation)
  private readonly repo: Repository<Reservation>,

  @InjectRepository(OrderItem)
  private readonly orderItemRepo: Repository<OrderItem>,

  @InjectRepository(Product)
  private readonly productRepo: Repository<Product>,

  @InjectRepository(User)
  private readonly userRepo: Repository<User>
) {}

  async findAll(): Promise<Reservation[]> {
    return this.repo.find();
  }

  async findByUser(userId: number): Promise<Reservation[]> {
    return this.repo.find({ where: { user: { id: userId } } });
  }

  async findOne(id: number): Promise<Reservation> {
    return this.repo.findOneOrFail({ where: { id } });
  }

  async create(dto: CreateReservationDto): Promise<Reservation> {

    const user = await this.userRepo.findOneByOrFail({ id: dto.userId });

    const orderItems: OrderItem[] = [];

      let total = 0;

    for (const itemDto of dto.products) {
      const product = await this.productRepo.findOneByOrFail({ id: itemDto.productId });
      const orderItem = this.orderItemRepo.create({
        product,
        quantity: itemDto.quantity
      });
      orderItems.push(orderItem);
      total += itemDto.quantity * product.price
    }
    const reservation = this.repo.create({
      date: new Date(dto.date),
      status: dto.status,
      total: total,
      qrCode: `RESERVATION:${Math.floor(Math.random() * 100000)}`,
      user,
      products: orderItems
    });

    return this.repo.save(reservation);
  }

  async updateStatus(id: number, status: ReservationStatus): Promise<Reservation> {
    const res = await this.repo.findOneOrFail({ where: { id } });
    res.status = status;
    return this.repo.save(res);
  }
}
