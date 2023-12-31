import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  logout() {
    return this.http.post(
      'http://localhost:3000/Admin/logout',
      {},
      { withCredentials: true }
    );
  }
  getLoggedUser() {
    const user = this.http.get('http://localhost:3000/Admin/getLoggedUser', {
      withCredentials: true,
    });
    return user;
  }
}
