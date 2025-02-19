import { Product } from "./product";

export interface CartItem {
  id: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
}

export interface Cart {
  id?: number;
  items: CartItem[];
  createdAt?: string;
  updatedAt?: string;
  totalPrice?: number;
}
