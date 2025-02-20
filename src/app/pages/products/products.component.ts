import { Component, inject } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductFormDialogComponent } from '../../components/product-form-dialog/product-form-dialog.component';
import { AuthService } from '../../services/auth.service';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { AuthUser } from '../../models/auth';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    FormsModule,
    RouterModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    CurrencyPipe
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        query('mat-card', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })))
        ], { optional: true })
      ])
    ])
  ]
})

export class ProductsComponent {
  private authService = inject(AuthService);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private wishlistService = inject(WishlistService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  debouceTimer: any;
  authUser?: AuthUser;
  isAdmin: Boolean = false;
  products: Product[] = [];
  totalProducts = 0;
  pageSize = 10;
  currentPage = 1;
  wishlist: number[] = [];

  // Filters
  searchQuery = '';
  selectedCategory = '';
  minPrice?: number;
  maxPrice?: number;
  inStock: boolean = true;

  categories = ['Electronics', 'Clothing', 'Home', 'Sports'];

  constructor() {
    this.loadProducts();
    this.authService.authUser$.subscribe(user => {
      this.authUser = user;
      this.isAdmin = user?.role === 'admin';
      if (user?.role === 'user') this.loadWishlist();
    });
  }



  searchByName(): void {
    //using debounce to avoid multiple api calls
    clearTimeout(this.debouceTimer);
    this.debouceTimer = setTimeout(() => this.loadProducts(), 500);
  }

  loadProducts() {
    this.productService
      .getProducts(this.currentPage, this.pageSize, this.searchQuery, this.selectedCategory, this.minPrice, this.maxPrice, this.inStock)
      .subscribe(({ data, total }) => {
        this.products = data;
        this.totalProducts = total;
      });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadProducts();
  }

  openProductForm(product?: Product) {
    const dialogRef = this.dialog.open(ProductFormDialogComponent, {
      width: '950px',
      data: { product },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadProducts();
        this.snackBar.open('Product saved successfully', 'Close', { duration: 3000 });
      }
    });
  }

  deleteProduct(productId: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe(() => {
        this.loadProducts();
        this.snackBar.open('Product deleted', 'Close', { duration: 3000 });
      });
    }
  }

  addToCart(productId: number) {
    this.cartService.addToCart(productId).subscribe(() => {
      this.snackBar.open('Product added to cart', 'Close', { duration: 3000 });
    });
  }

  loadWishlist() {
    this.wishlistService.getWishlist(this.authUser?.id!).subscribe(data => {
      this.wishlist = data.map(item => item.product.id);
    });
  }

  isInWishlist(productId: number): boolean {
    return this.wishlist.includes(productId);
  }

  toggleWishlist(product: any) {
    if (!this.authUser) return;

    if (this.isInWishlist(product.id)) {
      this.wishlistService.removeFromWishlist(product.id).subscribe(() => {
        this.wishlist = this.wishlist.filter(id => id !== product.id);
      });
    } else {
      this.wishlistService.addToWishlist(this.authUser.id, product.id).subscribe(() => {
        this.wishlist.push(product.id);
      });
    }
  }
}
