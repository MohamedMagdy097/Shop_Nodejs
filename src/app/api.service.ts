import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  port: number = 2000;
  isAuthenticated!: boolean;
  
  // session!: any;
  // requestOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   }),
  //   session : this.session
  // };
  
  constructor(private http: HttpClient, private router: Router) { }

  getProduct(): Observable<any> {
    return this.http.get(`http://localhost:${this.port}/products`);
  }

  addProduct(data: any): Observable<any> {
    return this.http.post(`http://localhost:${this.port}/admin/add-product`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`http://localhost:${this.port}/login`, data)
  }

  setIsAuthenticated(value: boolean) {
    this.isAuthenticated = value;
  }

  getProducts(): Observable<any> {
    return this.http.get(`http://localhost:${this.port}/products`);
  }

  getDetails(id: any): Observable<any> {
    return this.http.get(`http://localhost:${this.port}/products/${id}`);
  }

  searchBooks(bookTitle: string): Observable<any> {
    return this.http.get(`https://www.googleapis.com/books/v1/volumes?q=${bookTitle}`);
  }

  logout() {
    this.isAuthenticated = false;
    this.router.navigate(["/"]);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.post(`http://localhost:${this.port}/admin/delete-product`, {productId: id});
  }

  editProduct(newProduct: any): Observable<any> {
    return this.http.post(`http://localhost:${this.port}/admin/edit-product`, newProduct);
  }

  
}
