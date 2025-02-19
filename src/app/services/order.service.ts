import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/api/v1/order';

  constructor(private http: HttpClient) { }

  placeOrder(cartItems: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { cartItems });
  }

  getUserOrders(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }
}
