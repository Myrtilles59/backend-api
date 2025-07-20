import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Reservation } from '../../orders/entities/reservation.entity';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  address: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({nullable: true} )
  phoneNumber: string;

  @OneToMany(() => Reservation, reservation => reservation.user)
  reservations: Reservation[];

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;
  
}
