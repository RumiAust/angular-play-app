import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductModel } from '../model/product.model';
import { Product } from '../product/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  // GET all products
  getProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.apiUrl);
  }

  // ADD product
  addProduct(product: ProductModel): Observable<ProductModel> {
    return this.http.post<ProductModel>(this.apiUrl, product);
  }

  // UPDATE product
  updateProduct(product: ProductModel): Observable<ProductModel> {
    return this.http.put<ProductModel>(`${this.apiUrl}/${product.id}`, product);
  }

  // DELETE product
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}