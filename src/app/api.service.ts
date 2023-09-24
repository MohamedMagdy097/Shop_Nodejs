import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  isAuthenticated!: boolean;
  // session!: any;
  // requestOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   }),
  //   session : this.session
  // };
  constructor(private http: HttpClient) { }

  getProduct(): Observable<any> {
    return this.http.get('http://localhost:3000/products');
  }

  addProduct(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/admin/add-product', data);
  }

  login(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/login', data)
  }
  setIsAuthenticated(value: boolean) {
    this.isAuthenticated = value;
  }

  getProducts(): Observable<any> {
    return this.http.get(`http://localhost:3000/products`);
  }

  getDetails(id: any): Observable<any> {
    return this.http.get(`http://localhost:3000/products/${id}`);
  }
  searchBooks(bookTitle: string): Observable<any> {
    if (bookTitle === '') return new Observable();
    else return this.http.get(`https://www.googleapis.com/books/v1/volumes?q=${bookTitle}&key=AIzaSyBIH3MmbW2lhfAhKcrXmGwDYKyfsU2J4TQ`);
  }
}
