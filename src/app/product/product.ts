import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ProductModel } from '../model/product.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.html',
  imports: [FormsModule, CommonModule]
})
export class Product implements OnInit {

  products: ProductModel[] = [];

  newProduct: ProductModel = {
    name: '',
    price: 0
  };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => console.error(err)
    });
  }

  addProduct(): void {
    if (!this.newProduct.name || this.newProduct.price <= 0) return;

    this.productService.addProduct(this.newProduct).subscribe({
      next: () => {
        this.loadProducts();
        this.newProduct = { name: '', price: 0 };
      },
      error: (err) => console.error(err)
    });
  }

  updateProduct(product: ProductModel): void {
    if (!product.id) return;

    this.productService.updateProduct(product).subscribe({
      next: () => this.loadProducts(),
      error: (err) => console.error(err)
    });
  }

  deleteProduct(id?: number): void {
    if (!id) return;

    this.productService.deleteProduct(id).subscribe({
      next: () => this.loadProducts(),
      error: (err) => console.error(err)
    });
  }
}