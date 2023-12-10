import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

    
    private apiUrl = 'http://localhost:9090/api/v1/auth/';

  constructor(private http: HttpClient) {}
    isAuthenticated(): Observable<boolean> {
        const token=localStorage.getItem('access_token');
        console.log(this.http.get<boolean>(`${this.apiUrl}isTokenExpired?${token}`));
        
        return this.http.get<boolean>(`${this.apiUrl}isTokenExpired?${token}`);
      }
}