import { Injectable, inject } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private socket: Socket;
  private apiUrl = environment.apiUrl.replace('/api/v1', '');
  private refreshProductsSubject = new Subject<void>();
  
  
  constructor() {
    this.socket = io(this.apiUrl);
  }

  listen(event: string): Observable<any> {
    return new Observable(subscriber => {
      this.socket.on(event, (data) => {
        if (['product_created', 'product_updated', 'product_deleted'].includes(event))
          this.refreshProductsSubject.next();
        subscriber.next(data);
      });
    });
  }

  get refreshProducts$() {
    return this.refreshProductsSubject.asObservable();
  }
}
