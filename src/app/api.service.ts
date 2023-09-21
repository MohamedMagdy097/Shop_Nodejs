import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  addProduct(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/admin/add-product', data);
  }
}
