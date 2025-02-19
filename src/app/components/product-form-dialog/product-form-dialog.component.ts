import { Component, Inject, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ProductService } from '../../services/product.service';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-product-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  templateUrl: './product-form-dialog.component.html',
  styleUrls: ['./product-form-dialog.component.scss'],
})
export class ProductFormDialogComponent {
  private productService = inject(ProductService);
  productForm: FormGroup;
  categories = ['Electronics', 'Clothing', 'Home', 'Sports'];

  constructor(
    public dialogRef: MatDialogRef<ProductFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.productForm = new FormGroup({
      name: new FormControl(data?.product?.name || '', Validators.required),
      price: new FormControl(data?.product?.price || '', [Validators.required, Validators.min(0)]),
      category: new FormControl(data?.product?.category || '', Validators.required),
      stock: new FormControl(data?.product?.stock || '', Validators.required),
      description: new FormControl(data?.product?.description || ''),
    });
  }

  saveProduct() {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      if (this.data?.product)
        this.productService
          .updateProduct(this.data.product.id, productData)
          .subscribe(() => this.dialogRef.close(true));
      else
        this.productService
          .createProduct(productData)
          .subscribe(() => this.dialogRef.close(true));
    }
  }
}
