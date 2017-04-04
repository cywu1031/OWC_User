import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
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
    // this.baseUrl = 'https://sjsusmartfarm-backend.herokuapp.com/';
    this.baseUrl = 'http://localhost:3000/';
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
              for (var i = 0;i < data.json().length; ++i) {
                 this.shareService.crop_user.push(data.json()[i])
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

  public getSensorDataUrl() {    
    if (0 === this.shareService.crop_user.length) {
      return this.baseUrl + 'sensors/'
    }

    var selected_crop_user_idx = parseInt(this.shareService.selected_crop_user)
    var len = this.shareService.crop_user[selected_crop_user_idx].sensors.length
    var selected_crop_user_id = this.shareService.crop_user[selected_crop_user_idx]._id

    var url = this.baseUrl + 'sensor-history-user/'

    for (var i = 0;i < len; ++i) {
      var sensor_id = this.shareService.crop_user[selected_crop_user_idx].sensors[i]
      url +=  sensor_id + ';'
    }

    url = url.slice(0,-1)
    url += '/' + selected_crop_user_id + '/10'

    return url
  }

  public getSensorData(url) {
    return Observable.create(observer => {
        this.http.get(url)
          .subscribe(data => {
            if (200 === data.status) {
              var jdata = data.json()
              var selected_crop_user_idx = parseInt(this.shareService.selected_crop_user)

              for (var i = 0; i < this.shareService.sensor_info[selected_crop_user_idx].length; ++i) {
                var id = this.shareService.sensor_info[selected_crop_user_idx][i]._id

                if (jdata[id]) {
                  var sensor_data = jdata[id]

                  var k = 0
                  this.shareService.real_time_sensor_data[i][0].data = new Array(sensor_data.length) 
                  this.shareService.real_time_sensor_data_label[i][0] = new Array(sensor_data.length) 
                  for (var j = sensor_data.length - 1;j >= 0; --j) {
                    this.shareService.real_time_sensor_data[i][0].data[k] = parseFloat(sensor_data[j].value)
                    this.shareService.real_time_sensor_data_label[i][k++] = ""//sensor_data[j].creation_date
                  }
                }
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

  public getSensorHistory(sensor_id, crop_user_id, start, end) {
    return Observable.create(observer => {
      var url = this.baseUrl + 'sensor-history-range/' + sensor_id + '/'
      url += crop_user_id + '/' + start + '/' + end

      this.http.get(url)
        .subscribe(data => {
          if (200 === data.status) {
            this.shareService.history_search_temp = data.json()
          }

          observer.next(200 === data.status);
          observer.complete();
         }, error => {
           observer.next(false);
           observer.complete();
         });
    });
  }

  public updateCropUser(crop_user_id, update_data) {
    return Observable.create(observer => {
      var url = this.baseUrl + 'crop-user/' + crop_user_id;
      let headers = new Headers({ 'Content-Type': 'application/json' });

      this.http.put(url, update_data, {headers:headers})
        .subscribe(data => {
          observer.next(data.json());
          observer.complete();
         }, error => {
           observer.next(false);
           observer.complete();
         });
    });
  }
}