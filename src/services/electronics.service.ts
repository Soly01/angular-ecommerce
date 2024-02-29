import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ElectronicsService {
  constructor(private http: HttpClient) {}
  getElectronics(): Observable<any> {
    return this.http.get(
      'https://fakestoreapi.com/products/category/electronics',
      { observe: 'response' }
    );
  }
}
