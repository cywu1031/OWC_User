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
  baseUrl: any;

  constructor(public http: Http, private shareService: ShareService) {
    this.baseUrl = 'https://sjsusmartfarm-backend.herokuapp.com/';
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
            observer.next(data);
            observer.complete();
          }, error => {
            observer.next(null);
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
            observer.next(data);
            observer.complete();
           }, error => {
             observer.next(null);
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
            observer.next(data);
            observer.complete();
          }, error => {
            observer.next(null);
            observer.complete();
          });
      });
    }
  }

  public getSensorHistory(sensor_id, crop_user_id, start, end) {
    return Observable.create(observer => {
      var url = this.baseUrl + 'sensor-history-range?sensorId=' + sensor_id
      url += '&cropUserId=' + crop_user_id
      url += '&start=' + start
      url += '&end=' + end

      this.http.get(url)
        .subscribe(data => {
          observer.next(data);
          observer.complete();
         }, error => {
           observer.next(null);
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

  public getWaterHistory(crop_user_id, start, end) {
    return Observable.create(observer => {
      var url = this.baseUrl + 'water-history' 
      url += '?start=' + start
      url += '&end=' + end
      url += '&cropUserId=' + crop_user_id

      this.http.get(url)
        .subscribe(data => {
          observer.next(data);
          observer.complete();
         }, error => {
           observer.next(null);
           observer.complete();
         });
    });
  }

  public getDailyUsedWater(crop_user_id, start, end) {
    return Observable.create(observer => {
      var url = this.baseUrl + 'water-history/total-consumption' 
      url += '?cropUserId=' + crop_user_id
      url += '&start=' + start
      url += '&end=' + end
      
      this.http.get(url)
        .subscribe(data => {
          observer.next(data);
          observer.complete();
         }, error => {
           observer.next(null);
           observer.complete();
         });
    });
  }

  public getDailyWaterLimit(crop_user_id, date) {
    return Observable.create(observer => {
      var url = this.baseUrl + 'water-consumption-prediction/prediction' 
      url += '?crop_user_id=' + crop_user_id
      url += '&date=' + date
      
      this.http.get(url)
        .subscribe(data => {
          observer.next(data);
          observer.complete();
         }, error => {
           observer.next(null);
           observer.complete();
         });
    });
  }

  public getPredictionRangeDaily(crop_user_id, start, end) {
    return Observable.create(observer => {
      var url = this.baseUrl + 'water-consumption-prediction/predictionByRange' 
      url += '?crop_user_id=' + crop_user_id
      url += '&start_date=' + start
      url += '&end_date=' + end
      
      this.http.get(url)
        .subscribe(data => {
          observer.next(data);
          observer.complete();
         }, error => {
           observer.next(null);
           observer.complete();
         });
    });
  }

  public switchValve(onoff) {
    return Observable.create(observer => {
      var url = this.baseUrl + 'arduino_valve_control' 
      url += '?switch=' + onoff
      
      this.http.put(url, "")
        .subscribe(data => {
          observer.next(data);
          observer.complete();
         }, error => {
           observer.next(null);
           observer.complete();
         });
    });
  }
}