import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
// import { RestService } from './rest-service';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

export class User {
  name: string;
  email: string;
  
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

@Injectable()
export class AuthService {
  isLogin: boolean;
  currentUser: User;
  baseUrl: any;

  constructor(public http: Http) {
    this.isLogin = false;
    this.baseUrl = 'https://smartfarm-sjsu.herokuapp.com/';
    // this.baseUrl = 'http://localhost:3000/';
  }
 
  public login(credentials) {
    if (credentials.name === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        var url = this.baseUrl + 'users/login';
        var data = JSON.stringify({name: credentials.name, password: credentials.password})
        let headers = new Headers({ 'Content-Type': 'application/json' });

        this.http.post(url, data, {headers:headers})
          .subscribe(data => {
             // this.currentUser = new User('Simon', 'saimon@devdactic.com');
            observer.next(200 === data.status);
            observer.complete();
           }, error => {
             observer.next(false);
             observer.complete();
           });
      });
    }
  }

  public getUserInfo() : User {
    return this.currentUser;
  }
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}