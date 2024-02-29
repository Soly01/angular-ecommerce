import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JeweleriesService {
  constructor(private http: HttpClient) {}
  getJeweleries(): Observable<any> {
    return this.http.get(
      'https://fakestoreapi.com/products/category/jewelery',
      { observe: 'response' }
    );
  }
}
