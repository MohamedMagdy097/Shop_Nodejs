import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  port: number = 5000;
  isAuthenticated!: boolean;
  user!: any;
  
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

  setUser(value: any) {
    this.user = value;
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

  register(data: any): Observable<any> {
    return this.http.post(`http://localhost:${this.port}/signup`, data);
  }

  //Steven




  getAllMovies(pageNumber:number=1,pageSize:number=21): Observable<any> {
    let querydata=`pageNumber=${pageNumber}&pageSize=${pageSize}`
   return this.http.get(`http://localhost:${this.port}/shop/products?${querydata}`);
 }
 getMovieById(prodId: number): Observable<any> {
  // console.log("Getting id")
   return this.http.get(`http://localhost:${this.port}/shop/products/${prodId}`);
   
 }

  searchAllMovie(movieName: string): Observable<any> {
    if (movieName == '') {
      return this.getAllMovies();
    } else {
      return this.http.get(
        `http://localhost:${this.port}/shop/products?query=${movieName}`
      );
    }
  }


  // CART

  addToCart(data: any): Observable<any> {
    return this.http.post(`http://localhost:${this.port}/shop/cart`, data);
  }
}
