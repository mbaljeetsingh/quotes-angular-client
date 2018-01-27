import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  isLoggedIn() {
    return localStorage.getItem('quotesAngularToken') ? true : false;
  }

  getAccessToken() {
    return JSON.parse(localStorage.getItem('quotesAngularToken')).id;
  }

  login(data){
    console.log(data);

    const headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    });

    return this.http.post(`${environment.api_url}/api/Users/login`, data, {headers: headers});
  }

  logout(){
    const accessToken = this.getAccessToken();

    return this.http.post(`${environment.api_url}/api/Users/logout?access_token=${accessToken}`, {});
  }

}
