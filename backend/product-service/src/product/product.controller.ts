import { Controller, Get, Post, Delete, Param, Body, Query, Put } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(@Query('page') page = '1', @Query('limit') limit = '10') {
    return this.productService.findAll(+page, +limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findById(+id);
  }

  @Post()
  create(@Body() product: { name: string; price: number }) {
    return this.productService.create(product);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() product: Partial<{ name: string; price: number }>) {
    return this.productService.update(+id, product);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productService.delete(+id);
  }

  @MessagePattern({ cmd: 'get_product_by_id' })
  getProductById(id: number) {
    return this.productService.findById(id);
  }
}
