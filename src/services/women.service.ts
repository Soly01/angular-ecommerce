import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WomenService {
  constructor(private http: HttpClient) {}
  getWomen(): Observable<any> {
    return this.http.get(
      "https://fakestoreapi.com/products/category/women's%20clothing",
      { observe: 'response' }
    );
  }
}
