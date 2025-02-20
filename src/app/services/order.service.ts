import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = environment.apiUrl + 'order';

  constructor(private http: HttpClient) { }

  placeOrder(cartItems: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { cartItems });
  }

  getUserOrders(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }
}
