import {Body, Controller, Get, Param, Patch, Post, Request, UseGuards} from '@nestjs/common';
import {OrdersService} from './orders.service';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {Roles} from '../auth/roles.decorator';
import {RolesGuard} from '../auth/roles.guard';
import {CreateOrderDto} from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Request() req, @Body() dto: CreateOrderDto) {
        return this.ordersService.create(req.user.userId, dto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Get('active')
    findActive() {
        return this.ordersService.findActive();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Patch(':id/confirm-pickup')
    confirm(@Param('id') id: string) {
        return this.ordersService.confirmPickup(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id/qr-code')
    findQr(@Param('id') id: string) {
        return this.ordersService.findQr(+id);
    }
}