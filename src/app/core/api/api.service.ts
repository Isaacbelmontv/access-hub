import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}
  getUsers() {
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/users');
  }
}
