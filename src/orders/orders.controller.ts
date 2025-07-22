import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ReservationsService } from './orders.service';
import { CreateReservationDto } from './dto/create-order.dto';
import { Reservation } from './entities/reservation.entity';
import { ReservationStatus } from './enums/reservation-statuts.enum';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly service: ReservationsService) {}

  @Get()
  getAll(@Query('userId') userId?: number): Promise<Reservation[]> {
    return userId ? this.service.findByUser(userId) : this.service.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Reservation> {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Body() dto: CreateReservationDto): Promise<Reservation> {

    return this.service.create(dto);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: { status: ReservationStatus }): Promise<Reservation> {
    return this.service.updateStatus(+id, body.status);
  }
}
