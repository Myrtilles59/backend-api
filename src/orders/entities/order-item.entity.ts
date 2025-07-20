import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Reservation } from './reservation.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Reservation, (reservation) => reservation.products)
  reservation: Reservation;
    
  @ManyToOne(() => Product, { eager: true })
  product: Product;
}
