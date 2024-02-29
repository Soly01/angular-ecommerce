import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor(private http: HttpClient) {}
  getPhoto(): Observable<any> {
    return this.http.get('../assets/photo.json', { observe: 'response' });
  }
}
