import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {ProductsModule} from './products/products.module';
import {OrdersModule} from './orders/orders.module';

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (cfg: ConfigService) => ({
                type: 'postgres',
                host: cfg.get('DB_HOST'),
                port: +cfg.get('DB_PORT'),
                username: cfg.get('DB_USER'),
                password: cfg.get('DB_PASS'),
                database: cfg.get('DB_NAME'),
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
        AuthModule,
        UsersModule,
        ProductsModule,
        OrdersModule,
    ],
})
export class AppModule {
}