import { Wishlist } from "./wishlist";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  description?: string;
  wishlist?: Wishlist[];
  createdAt: Date;
  updatedAt: Date;
}
