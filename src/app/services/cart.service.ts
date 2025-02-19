import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000/api/v1/cart';
  private http = inject(HttpClient);

  getCart(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  addToCart(productId: number, quantity = 1): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, { productId, quantity });
  }

  removeFromCart(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${productId}`);
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clear`);
  }
}
