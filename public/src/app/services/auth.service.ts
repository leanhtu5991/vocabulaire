import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { User } from '../data/user';
import { Observable } from 'rxjs-compat/Observable';
interface TokenResponse {
  token: string;
}

interface DecodedToken {
  role: number;
}

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
}

@Injectable()
export class AuthenticationService {
  private readonly tokenStorageName: string = 'token';
  private token: string;

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) { }

  private saveToken(token: string): void {
    localStorage.setItem(this.tokenStorageName, token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem(this.tokenStorageName);
    }
    return this.token;
  }

  public loggedIn(): boolean {
    return !this.jwtHelper.isTokenExpired();
  }

  public isAdmin(): boolean {
    var decodedToken = this.jwtHelper.decodeToken().user as DecodedToken;
    return decodedToken !== null && decodedToken.role == 1;
  }

  private request(method: 'post' | 'get', type: 'login' | 'register' | 'profile' | 'files', user?: TokenPayload) {
    let base;

    if (method === 'post') {
      base = this.http.post(`/api/${type}`, user);
    } else {
      base = this.http.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` } });
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public register(user) {
    return this.request('post', 'register', user);
  }

  public login(user: TokenPayload) {
    return this.request('post', 'login', user);
  }

  public profile() : Observable<any>{
    return this.request('get', 'profile');
  }

  public logout(): void {
    this.token = '';
    localStorage.clear();
    console.log(localStorage)
    this.router.navigateByUrl('/');
  }

  // public getCurrentUser(){
  //   //TEST
  //   return JSON.parse(localStorage.getItem(CONST.CURRENT_USER));
  // }

}
