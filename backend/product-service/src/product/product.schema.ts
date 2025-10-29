
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

export interface CreateProductDto {
  name: string;
  price: number;
  description?: string;
  category?: string;
  stock?: number;
}


export interface UpdateProductDto {
  name?: string;
  price?: number;
  description?: string;
  category?: string;
  stock?: number;
}
