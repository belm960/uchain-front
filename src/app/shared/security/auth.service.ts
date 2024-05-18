import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
 
import { JwtResponse } from './jwt-response';
import { AuthLoginInfo } from './login-info';
import { SignUpInfo } from './signup-info';
import { of } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogin = false;
  roleAs: string
  private loginUrl = 'http://127.0.0.1:8000/user/login ';
  private signupUrl = 'http://localhost:8009/api/auth/signup';
 
  constructor(private http: HttpClient) {
  }
 
  attemptAuth(formData: FormData): Observable<JwtResponse> {
    console.log(formData);
    return this.http.post<JwtResponse>(this.loginUrl, formData);
  }
 
  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }
  getRole() {
    return localStorage.getItem('ROLE');
  }
  isLoggedIn() {
    const loggedIn = localStorage.getItem('STATE');
    if (loggedIn === 'true') {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
    return this.isLogin;
  }
  getUserFullName() {
    return localStorage.getItem('FULLNAME');
  }
  getUserImg() {
    return localStorage.getItem('USERIMG');
  }
  logout() {
    this.isLogin = false;
    this.roleAs = '';
    localStorage.setItem('STATE', 'false');
    localStorage.setItem('ROLE', '');
    localStorage.setItem('FULLNAME', '');
    localStorage.setItem('USERIMG', '');
    return of({ success: this.isLogin, role: '' });
  }
}