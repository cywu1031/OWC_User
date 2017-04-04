import { Component, NgZone } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';

import { ShareService } from '../../providers/shareservice';

import { ChartSetting } from '../../providers/chart-setting';

import { BackendService } from '../../providers/backend-service';
// import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  providers: [ChartSetting]
})

export class DashboardPage {
  manual: any;
  update_interval: any

  constructor(public navCtrl: NavController, private shareService: ShareService, 
              private chartSetting: ChartSetting, private alertCtrl: AlertController, 
              private backendService: BackendService, private zone: NgZone, public http: Http) {
    this.manual = false;
    // this.initSensorData();
    this.initWeatherData();
    this.shareService.title = 'Dashboard';
    this.chartSetting.lineChartLabels = [['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                       ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                       ['January', 'February', 'March', 'April', 'May', 'June', 'July']];
  }

  ionViewDidLoad() {
    // Observable.interval(5000)
    //             .switchMap(() => this.http.get(this.backendService.getSensorDataUrl()))
    //             .map((data) => data.json())
    //             .subscribe((data) => {
    //               this.zone.run(() => {
    //                 if (0 === this.shareService.sensor_info.length) {
    //                   return
    //                 }
    //                 var selected_crop_user_idx = parseInt(this.shareService.selected_crop_user)

    //                 for (var i = 0; i < this.shareService.sensor_info[selected_crop_user_idx].length; ++i) {
    //                   var id = this.shareService.sensor_info[selected_crop_user_idx][i]._id

    //                   if (data[id]) {
    //                     var sensor_data = data[id]
    //                     var k = 0
    //                     this.shareService.real_time_sensor_data[i][0].data = new Array(sensor_data.length) 
    //                     for (var j = sensor_data.length - 1;j >= 0; --j) {
    //                       this.shareService.real_time_sensor_data[i][0].data[k++] = parseInt(sensor_data[j].value)
    //                     }
    //                   }
    //                 }
    //               });
    //             })

  }

  // initSensorData() {
  //   this.chartSetting.lineChartData = [[{data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'}],
  //       [{data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}],
  //       [{data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}]]

  //   this.chartSetting.lineChartLabels = [['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  //                                      ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  //                                      ['January', 'February', 'March', 'April', 'May', 'June', 'July']];
  // }

  initWeatherData() {
  }

  irrigateSelected() {
  }

  toggleChanged() {
    // if ('Dashboard' === this.shareService.title) {
    //   this.shareService.title = '999'
    // } else {
    //   this.shareService.title = 'Dashboard'
    // }
    // var selected_crop_user_idx = parseInt(this.shareService.selected_crop_user)

    // for (var i = 0; i < this.shareService.sensor_info[selected_crop_user_idx].length; ++i) {
    //   var id = this.shareService.sensor_info[selected_crop_user_idx][i]._id

    //   var sensor_data = [80,40,60,50,80]
    //   var k = 0
    //   let clone = JSON.parse(JSON.stringify(this.shareService.real_time_sensor_data[i][0]))
    //   clone.data = sensor_data
    //   this.shareService.real_time_sensor_data[i][0] = clone

    // }
  }

  showError(text) {
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}
