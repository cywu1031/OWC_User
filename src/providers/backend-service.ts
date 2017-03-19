import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ShareService } from './shareservice';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/


@Injectable()
export class BackendService {
  isLogin: boolean;
  baseUrl: any;

  constructor(public http: Http, private shareService: ShareService) {
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
            if (200 === data.status) {
              this.shareService.user_info = data.json()
            }

            observer.next(200 === data.status);
            observer.complete();
           }, error => {
             observer.next(false);
             observer.complete();
           });
      });
    }
  }

  // public getUserInfo() : User {
  //   return this.currentUser;
  // }
 
  public logout() {
    return Observable.create(observer => {
      //this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

  public getCropUser(user_id) {
    if (user_id === null || user_id === '') {
      return Observable.throw("[getCropUser] user id null or empty");
    } else {
      return Observable.create(observer => {
        var url = this.baseUrl + 'crop-user/' + user_id;

        this.http.get(url)
          .subscribe(data => {
            if (200 === data.status) {
              this.shareService.sensor_info = new Array(data.json().length)

              for (var i = 0;i < data.json().length; ++i) {
                 this.shareService.crop_user.push(data.json()[i])
                 this.shareService.sensor_info[i] = new Array()
              }
            }

            observer.next(200 === data.status);
            observer.complete();
           }, error => {
             observer.next(false);
             observer.complete();
           });
      });
    }
  }

  public getSensorInfo(sensor_id, crop_user_idx) {
    if (sensor_id === null || sensor_id === '') {
      return Observable.throw("[getSensorInfo] sensor id null or empty");
    } else {
      return Observable.create(observer => {
        var url = this.baseUrl + 'sensors/' + sensor_id;

        this.http.get(url)
          .subscribe(data => {
            if (200 === data.status) {
              this.shareService.sensor_info[crop_user_idx].push(data.json())
            }

            observer.next(200 === data.status);
            observer.complete();
           }, error => {
             observer.next(false);
             observer.complete();
           });
      });
    }
  }
}