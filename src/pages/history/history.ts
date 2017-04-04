import { Component } from '@angular/core';

import { NavController, LoadingController, Loading, AlertController } from 'ionic-angular';

import { ShareService } from '../../providers/shareservice';

import { BackendService } from '../../providers/backend-service';

import { ChartSetting } from '../../providers/chart-setting';


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
  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController, 
      private alertCtrl: AlertController, private shareService: ShareService, 
      private backendService: BackendService, private chartSetting: ChartSetting) {
      this.shareService.title = 'History';
      this.isSearchDataAvailable = false
      this.chartSetting.lineChartLabels = [['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                       ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                       ['January', 'February', 'March', 'April', 'May', 'June', 'July']];
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
    if (sensor_idx + 1 > this.shareService.sensor_info[crop_user_idx].length) {
      this.loading.dismiss()
      this.isSearchDataAvailable = true
      return
    }
    
    var sensor_id = this.shareService.sensor_info[crop_user_idx][sensor_idx]._id
    var crop_user_id = this.shareService.crop_user[crop_user_idx]._id
    this.backendService.getSensorHistory(sensor_id, crop_user_id, this.start_date_time, this.end_date_time).subscribe(allowed => {
        if (allowed) {
          setTimeout(() => {
          this.sensor_data.push([])
          this.labels.push([])
          var idx = this.sensor_data.length - 1
          this.sensor_data[idx].push({data:[], label:""})

          for (var i = 0;i < this.shareService.history_search_temp.length; ++i) {
              this.sensor_data[idx][0].data.push(this.shareService.history_search_temp[i].value)
              this.labels[idx].push("")//(this.shareService.history_search_temp[i].creation_date)
          }

          this.callSensorInfoService(sensor_idx + 1);
        });
        } else {
          this.showError("Get sensor info failed");
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
