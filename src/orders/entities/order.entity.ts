import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {User} from '../../users/entities/user.entity';
import {OrderItem} from './order-item.entity';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.orders, {eager: true})
    user: User;

    @OneToMany(() => OrderItem, (item) => item.order, {cascade: true, eager: true})
    items: OrderItem[];

    @Column('decimal')
    total: number;

    @Column({default: 'pending'})
    status: string;

    @Column({nullable: true})
    qrCodeUrl: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({nullable: true})
    pickedUpAt: Date;
}
