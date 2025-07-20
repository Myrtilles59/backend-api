import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ReservationStatus } from '../enums/reservation-statuts.enum';
import { OrderItem } from './order-item.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column({
    type: 'enum',
    enum: ReservationStatus,
    default: ReservationStatus.EN_COURS,
  })
  status: ReservationStatus;

  @Column({type: 'float',nullable: true })
  total: number;

  @ManyToOne(() => User, (user) => user.reservations, { eager: true })
  user: User;

  @OneToMany(() => OrderItem, (item) => item.reservation, { cascade: true, eager: true })
  products: OrderItem[];

  @Column({ nullable: true })
  qrCode: string;
}
