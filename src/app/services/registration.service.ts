import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {  User } from '../model/user.model';
import { LoginModel } from '../model/loginModel';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apiUrl = 'http://localhost:9090/api/v1/auth';
  private accessToken!: string;
  constructor(private http: HttpClient) {}

  registerUser(data: User): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/register', data).pipe(
      tap((response)=>{
        this.accessToken = response.accessToken;

      })
    )
  }
  getAccessToken(): string {
    return this.accessToken;
  }


  // login(username: string, password: string): Observable<any> {
  //   const credentials = { username, password };
  //   return this.http.post<any>(`${this.apiUrl}/authenticate`, credentials).pipe(
  //     tap((response) => {
  //       this.accessToken = response.accessToken;
  //       localStorage.setItem('access_token', this.accessToken);
  //       localStorage.setItem('user_email', username);
  //     })
  //   );
  // }

  login(loginData: LoginModel): Observable<any> {

    // console.log(this.http.post<any>(url, loginData));
    
    const url = `${this.apiUrl}/authenticate`;
    return this.http.post<any>(url, loginData).pipe(tap((response)=>{
      this.accessToken =response.accessToken;
        localStorage.setItem('access_token', this.accessToken);
        localStorage.setItem('user_email', loginData.email);

    }));
  }
}
