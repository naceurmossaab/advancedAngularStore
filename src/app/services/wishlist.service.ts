import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private apiUrl = environment.apiUrl + 'wishlist';
  private http = inject(HttpClient);

  getWishlist(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  addToWishlist(userId: number, productId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { userId, productId });
  }

  removeFromWishlist(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${productId}`);
  }
}
