import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  constructor(private http: HttpClient) {}

  getDetails(productId: string): Observable<any> {
    return this.http.get(`https://fakestoreapi.com/products/${productId}`);
  }
}
