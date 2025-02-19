import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Cart, CartItem } from '../../models/cart';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    CurrencyPipe
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  private cartService = inject(CartService);
  private snackBar = inject(MatSnackBar);
  cart: Cart = { items: [], totalPrice: 0 };

  constructor() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe((data) => {
      const totalPrice = data.items.reduce((sum: number, item: CartItem) => {
        return sum + item.product.price * item.quantity;
      }, 0);
      this.cart = { ...data, totalPrice };
    });
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId).subscribe(() => {
      this.loadCart();
      this.snackBar.open('Item removed from cart', 'Close', { duration: 3000 });
    });
  }

  clearCart() {
    this.cartService.clearCart().subscribe(() => {
      this.loadCart();
      this.snackBar.open('Cart cleared', 'Close', { duration: 3000 });
    });
  }
}
