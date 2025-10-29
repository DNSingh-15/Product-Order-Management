import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
  GatewayTimeoutException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, timeout } from 'rxjs';
import { Order, CreateOrderDto, UpdateOrderDto, Product } from './order.schema';

@Injectable()
export class OrderService {
  private orders: Order[] = [];
  private counter = 1;

  constructor(
    @Inject('PRODUCT_SERVICE') private readonly productClient: ClientProxy,
  ) {}

  async create(orderData: CreateOrderDto) {
    if (!orderData?.productId || !orderData?.quantity)
      throw new BadRequestException('productId and quantity are required');

    try {
      await this.productClient.connect();
    } catch {
      throw new GatewayTimeoutException('Product service unreachable');
    }

    const product = await lastValueFrom(
      this.productClient
        .send<Product>({ cmd: 'get_product_by_id' }, orderData.productId)
        .pipe(timeout(3000)),
    );

    if (!product) throw new NotFoundException(`Product ${orderData.productId} not found`);

    const totalPrice = product.price * orderData.quantity;
    const now = new Date().toISOString();

    const newOrder: Order = {
      id: this.counter++,
      productId: orderData.productId,
      quantity: orderData.quantity,
      totalPrice,
      createdAt: now,
      updatedAt: now,
      product,
    };

    this.orders.push(newOrder);
    return newOrder;
  }

  findAll(page = 1, limit = 10) {
    const start = (page - 1) * limit;
    const paginated = this.orders.slice(start, start + limit);
    return {
      data: paginated,
      total: this.orders.length,
      page,
      limit,
    };
  }

  update(id: number, patch: UpdateOrderDto) {
    const order = this.orders.find((o) => o.id === id);
    if (!order) throw new NotFoundException('Order not found');

    if (patch.quantity !== undefined) {
      if (patch.quantity <= 0) throw new BadRequestException('Quantity must be > 0');
      const unitPrice = order.totalPrice / order.quantity;
      order.quantity = patch.quantity;
      order.totalPrice = unitPrice * patch.quantity;
    }

    order.updatedAt = new Date().toISOString();
    return order;
  }

  remove(id: number) {
    const idx = this.orders.findIndex((o) => o.id === id);
    if (idx === -1) throw new NotFoundException('Order not found');
    const removed = this.orders.splice(idx, 1)[0];
    return { message: 'Order deleted', removed };
  }
}
