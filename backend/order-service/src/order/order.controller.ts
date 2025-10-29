import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() order: any) {
    return this.orderService.create(order);
  }

  @Get()
  findAll(@Query('page') page = '1', @Query('limit') limit = '10') {
    return this.orderService.findAll(Number(page), Number(limit));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() patch: any) {
    return this.orderService.update(Number(id), patch);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(Number(id));
  }
}
