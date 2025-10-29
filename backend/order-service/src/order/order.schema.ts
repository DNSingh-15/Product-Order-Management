
export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  category?: string;
  stock?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Order {
  id: number;
  productId: number;
  quantity: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  product?: Product;
}

export interface CreateOrderDto {
  productId: number;
  quantity: number;
}

export interface UpdateOrderDto {
  quantity?: number;
}
