import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/v1/products';
  private http = inject(HttpClient);

  getProducts(
    page: number = 1,
    limit: number = 10,
    name?: string,
    category?: string,
    minPrice?: number,
    maxPrice?: number,
    stock?: boolean
  ): Observable<any> {
    let params: any = { page, limit };

    if (name) params.name = name;
    if (category) params.category = category;
    if (minPrice !== undefined) params.minPrice = minPrice;
    if (maxPrice !== undefined) params.maxPrice = maxPrice;
    if (stock !== undefined) params.stock = stock;

    return this.http.get<any>(this.apiUrl, { params });
  }


  getProductById(id: number): Observable<any> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: Product): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }

  updateProduct(id: number, product: Product): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
