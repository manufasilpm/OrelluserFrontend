import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserDetails } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:9090/api/user';
  // http://localhost:9090/api/user/{{email}}
  constructor(private http: HttpClient) {}

  getUserDetails(): Observable<any> {
    const jwtToken = localStorage.getItem('access_token');
    const email = localStorage.getItem('user_email');

    const headers = { Authorization: `Bearer ${jwtToken}` };

    return this.http.get<any>(`${this.apiUrl}/user-details?email=${email}`, {
      headers,
    });
  }

  updateUserDetails(updatedUserData: any): Observable<any> {
    const jwtToken = localStorage.getItem('access_token');
    const email = localStorage.getItem('user_email');
    const headers = { Authorization: `Bearer ${jwtToken}` };
    const apiUrlWithEmail = `${this.apiUrl}/update?email=${email}`;
    console.log(this.http.put(apiUrlWithEmail, updatedUserData, { headers }));
    return this.http.put(apiUrlWithEmail, updatedUserData, { headers });
  }
}
