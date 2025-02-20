import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { WishlistService } from '../../services/wishlist.service';
import { AuthUser } from '../../models/auth';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishlist: any[] = [];
  private wishlistService = inject(WishlistService);
  private authService = inject(AuthService);
  authUser?: AuthUser;


  ngOnInit() {
    this.authService.authUser$.subscribe(user => this.authUser = user);
    if (this.authUser && this.authUser.role === 'user') this.loadWishlist();
  }

  loadWishlist() {
    this.wishlistService.getWishlist(this.authUser?.id!).subscribe(
      data => this.wishlist = data,
      error => console.error('Failed to load wishlist', error)
    );
  }

  removeFromWishlist(productId: number) {
    if (!this.authUser) return;
    this.wishlistService.removeFromWishlist(productId).subscribe(() => {
      this.wishlist = this.wishlist.filter(item => item.product.id !== productId);
    });
  }
}
