import { Injectable, NotFoundException } from '@nestjs/common';

export interface Product {
  id: number;
  name: string;
  price: number;
}

@Injectable()
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Laptop', price: 1000 },
    { id: 2, name: 'Phone', price: 500 },
    { id: 3, name: 'Tablet', price: 750 },
  ];
  private counter = this.products.length + 1;

  findAll(page = 1, limit = 10) {
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = this.products.slice(start, end);
    return {
      data: paginated,
      total: this.products.length,
      page,
      limit,
    };
  }

  findById(id: number): Product {
    const product = this.products.find((p) => p.id === id);
    if (!product) throw new NotFoundException(`Product with ID ${id} not found`);
    return product;
  }

  create(product: Omit<Product, 'id'>) {
    const newProduct = { id: this.counter++, ...product };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, product: Partial<Omit<Product, 'id'>>) {
    const existing = this.findById(id);
    Object.assign(existing, product);
    return { message: 'Product updated successfully', product: existing };
  }

  delete(id: number) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException('Product not found');
    const deleted = this.products.splice(index, 1)[0];
    return { message: 'Product deleted successfully', deleted };
  }
}
