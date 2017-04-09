import { Component } from '@angular/core';

import { NavController, LoadingController, Loading, AlertController } from 'ionic-angular';

import { ShareService } from '../../providers/shareservice';

import { BackendService } from '../../providers/backend-service';

import { ChartSetting } from '../../providers/chart-setting';

import * as moment from 'moment-timezone';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
  providers: [ChartSetting]
})
export class HistoryPage {
 
  start_date_time: any
  end_date_time: any
  isSearchDataAvailable: any
  loading: Loading;
  sensor_data: any
  labels: any

  water_history_data: any
  water_history_label: any
  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController, 
      private alertCtrl: AlertController, private shareService: ShareService, 
      private backendService: BackendService, private chartSetting: ChartSetting) {
      this.shareService.title = 'History';
      this.isSearchDataAvailable = false
  }

  ionViewDidLoad() {
  }

  submitSelected() {
      this.showLoading()
      this.isSearchDataAvailable = false
      this.loadSensorHistory()
  }

  loadSensorHistory() {
    if (0 === this.shareService.sensor_info.length) {
      this.showError("No sensor")
      return
    }

    this.sensor_data = new Array()
    this.labels = new Array()
    this.callSensorInfoService(0)
  }

  callSensorInfoService(sensor_idx) {
    var crop_user_idx = parseInt(this.shareService.selected_crop_user)
    if (sensor_idx >= this.shareService.sensor_info[crop_user_idx].length) {
      this.callWaterHistory()
      return
    }
    
    var sensor_id = this.shareService.sensor_info[crop_user_idx][sensor_idx]._id
    var crop_user_id = this.shareService.crop_user[crop_user_idx]._id
    this.backendService.getSensorHistory(
      sensor_id, crop_user_id, this.start_date_time, this.end_date_time).subscribe(data => {
        if (data && 200 === data.status) {
          setTimeout(() => {
            var sensor_history = data.json()
            this.sensor_data.push([])
            this.labels.push([])
            this.sensor_data[sensor_idx].push({data:[], label:""})

            for (var i = 0;i < sensor_history.length; ++i) {
                this.sensor_data[sensor_idx][0].data.push(sensor_history[i].value)
                this.labels[sensor_idx].push(sensor_history[i].creation_date)
            }

            this.callSensorInfoService(sensor_idx + 1);
        });
        } else {
          this.showError("Get sensor history failed");
        }
      },
      error => {
        this.showError(error);
      });
  }

  callWaterHistory() {
    var end = moment(this.start_date_time)
    var start = moment(this.end_date_time)
    var crop_user_id = this.shareService.getCropUserId()

    this.backendService.getWaterHistory(crop_user_id, start, end).subscribe(data => {
        if (data && 200 === data.status) {
          setTimeout(() => {
            var water_history = data.json()

            this.water_history_data = new Array(water_history.length) 
            this.water_history_label = new Array(water_history.length) 

            for (var i = 0;i < water_history.length; ++i) {
              this.water_history_data[i] = parseFloat(water_history[i].value)
              this.water_history_label[i] = water_history[i].creation_date
            }

            this.loading.dismiss()
            this.isSearchDataAvailable = true
          });
        } else {
          this.showError("Get water history failed");
        }
      },
      error => {
        this.showError(error);
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Retrieving your info. Please wait...'
    });
    this.loading.present();
  }

  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}
