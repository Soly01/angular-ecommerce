import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenService {
  constructor(private http: HttpClient) {}
  getMen(): Observable<any> {
    return this.http.get(
      "https://fakestoreapi.com/products/category/men's%20clothing",
      { observe: 'response' }
    );
  }
}
