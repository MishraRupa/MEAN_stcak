import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/productModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl="http://localhost:5000/api/products";
  constructor(private http:HttpClient) { }

   getProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createProduct(product: Product): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }

  updateProduct(id: string, product: Product): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
