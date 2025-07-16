import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Order} from '../../orders/entities/order.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column({default: 'user'})
    role: string;

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];
}