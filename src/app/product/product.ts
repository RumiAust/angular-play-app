import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { ProductModel } from '../model/product.model';
import { Observable, BehaviorSubject, switchMap, startWith } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.html',
  styleUrls: ['./product.css'],
  imports: [FormsModule, CommonModule],
})
export class Product {
  // reactive stream of products
  private refreshProducts$ = new BehaviorSubject<void>(undefined);
  products$: Observable<ProductModel[]>;

  newProduct: ProductModel = { name: '', price: 0 };

  constructor(private productService: ProductService) {
    // reload products whenever refreshProducts$ emits
    this.products$ = this.refreshProducts$.pipe(
      startWith(undefined),
      switchMap(() => this.productService.getProducts())
    );
  }

  // Add product
  addProduct(): void {
    if (!this.newProduct.name || this.newProduct.price <= 0) return;

    this.productService.addProduct(this.newProduct).subscribe({
      next: () => {
        this.newProduct = { name: '', price: 0 };
        this.refreshProducts$.next(); // trigger refresh
      },
      error: (err) => console.error(err),
    });
  }

  confirmAddProduct(): void {
    if (!this.newProduct.name || this.newProduct.price <= 0) {
      alert('Please enter valid product details.');
      return;
    }

    if (confirm(`Are you sure you want to add "${this.newProduct.name}" with price ${this.newProduct.price}?`)) {
      this.addProduct();
    }
  }

  updateProduct(product: ProductModel): void {
  if (!product.id) {
    console.error('Cannot update product without ID', product);
    return;
  }

  // make a shallow copy to ensure immutable update
  const payload: ProductModel = { ...product };

  this.productService.updateProduct(payload).subscribe({
    next: (updated) => {
      console.log('Product updated:', updated);
      this.refreshProducts$.next(); // trigger reload after successful update
    },
    error: (err) => console.error('Update failed:', err),
  });
  }

  deleteProduct(id?: number): void {
    if (!id) return;
    this.productService.deleteProduct(id).subscribe({
      next: () => this.refreshProducts$.next(),
      error: (err) => console.error(err),
    });
  }
}