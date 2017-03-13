import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

/*
  Generated class for the RestService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RestService {
  baseUrl: any;

  constructor(public http: Http) {
      this.baseUrl = 'https://smartfarm-sjsu.herokuapp.com/';
      // this.baseUrl = 'http://localhost:3000/';
  }

  login() {
      var url = this.baseUrl + 'users';
      return this.http.get(url).map(res => res.json());
  }
}
