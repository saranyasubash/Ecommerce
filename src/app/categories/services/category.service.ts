import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category-model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private http = inject(HttpClient);
  private API = 'http://127.0.0.1/projects/ecommerce-admin-api/public/api';

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.API}/categories`);
  }
  

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.API}/categories/${id}`);
  }

  createCategory(data: Partial<Category>): Observable<any> {
    return this.http.post(`${this.API}/categories`, data);
  }

  updateCategory(id: number, data: Partial<Category>): Observable<any> {
    return this.http.put(`${this.API}/categories/${id}`, data);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.API}/categories/${id}`);
  }
}
