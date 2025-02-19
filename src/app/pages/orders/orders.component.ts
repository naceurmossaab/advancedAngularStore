import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { AuthUser } from '../../models/auth';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatCardModule
  ],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  private orderService = inject(OrderService);
  private authService = inject(AuthService);
  authUser?: AuthUser;

  ngOnInit() {
    this.authService.authUser$.subscribe(user => this.authUser = user);
    if (this.authUser) this.loadOrders();
  }

  loadOrders() {
    this.orderService.getUserOrders(this.authUser?.id!).subscribe(
      data => this.orders = data,
      error => console.error('Failed to load orders', error)
    );
  }
}
