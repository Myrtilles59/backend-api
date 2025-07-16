import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({default: ''})
    description: string;

    @Column('decimal')
    price: number;

    @Column()
    imageUrl: string;
}