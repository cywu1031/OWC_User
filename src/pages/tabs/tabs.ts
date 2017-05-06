import { Component, NgZone } from '@angular/core';
import { Tab, LoadingController, Loading, AlertController } from 'ionic-angular';

import { DashboardPage } from '../dashboard/dashboard';
import { HistoryPage } from '../history/history';
import { AnalysisPage } from '../analysis/analysis';
import { ManagementPage } from '../management/management';
import { ShareService } from '../../providers/shareservice';
import { BackendService } from '../../providers/backend-service';

// import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';

@Component({
  templateUrl: 'tabs.html',
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = DashboardPage;
  tab2Root: any = HistoryPage;
  tab3Root: any = AnalysisPage;
  tab4Root: any = ManagementPage;

  loading: Loading;

  constructor(private shareService: ShareService, private backendService: BackendService,
              private loadingCtrl: LoadingController, private alertCtrl: AlertController, 
              public http: Http, private zone: NgZone) {
    this.loadSensorInfo()
  }

  tabChange(tab: Tab){
    this.shareService.title = tab.tabTitle
  }

  loadSensorInfo() {
    this.showLoading();

    if (0 === this.shareService.crop_user.length) {
      this.showError("No crop user")
      return
    }

    this.callSensorInfoService(0, 0)
  }

  callSensorInfoService(crop_user_idx, sensor_idx) {
    // Got all sensor info 
    if (crop_user_idx >= this.shareService.crop_user.length) {
      var selected_crop_user_idx = parseInt(this.shareService.selected_crop_user)

      var end = this.shareService.getBayTime()
      var start = this.shareService.getBayTime()
      start.subtract(this.shareService.real_time_data_range, 'm')

      this.loadSensorData(selected_crop_user_idx, 0, start.toISOString(), end.toISOString())
      return
    }

    // request next crop user
    if (sensor_idx + 1 > this.shareService.crop_user[crop_user_idx].sensors.length) {
      this.callSensorInfoService(crop_user_idx + 1, 0)
      return
    }

    this.backendService.getSensorInfo(
      this.shareService.crop_user[crop_user_idx].sensors[sensor_idx], crop_user_idx).subscribe(data => {
      if (data && 200 === data.status) {
        setTimeout(() => {
          this.shareService.sensor_info[crop_user_idx].push(data.json())
          this.callSensorInfoService(crop_user_idx, sensor_idx + 1);
      });
      } else {
        this.showError("Get sensor info failed");
      }
    },
    error => {
      this.showError(error);
    });
  }

  loadSensorData(crop_user_idx, sensor_idx, start, end) {
    if (sensor_idx >= this.shareService.sensor_info[crop_user_idx].length) {
      // this.shareService.isDataAvailable = true
      // this.loading.dismiss()
      this.callWaterHistory()
      return
    }

    var sensor_id = this.shareService.sensor_info[crop_user_idx][sensor_idx]._id
    var crop_user_id = this.shareService.crop_user[crop_user_idx]._id
    this.backendService.getSensorHistory(sensor_id, crop_user_id, start, end).subscribe(data => {
      if (data && 200 === data.status) {
        setTimeout(() => {
          var sensor_history = data.json()

          this.shareService.real_time_sensor_data[sensor_idx][0].data = new Array(sensor_history.length) 
          this.shareService.real_time_sensor_data_label[sensor_idx][0] = new Array(sensor_history.length)
          this.shareService.real_time_sensor_data[sensor_idx][0].label = this.shareService.sensor_info[crop_user_idx][sensor_idx].name
          for (var i = 0;i < sensor_history.length; ++i) {
            this.shareService.real_time_sensor_data[sensor_idx][0].data[i] = parseFloat(sensor_history[i].value)
            var datetime = sensor_history[i].creation_date.split('T')
            var time = datetime[1].split('.')
            this.shareService.real_time_sensor_data_label[sensor_idx][i] = time[0]
          }

          this.loadSensorData(crop_user_idx, sensor_idx + 1, start, end)
        });
      } else {
        this.showError("Get sensor data failed");
      }
    },
    error => {
      this.showError(error);
    });
  }

  callWaterHistory() {
    var end = this.shareService.getTimeFormat(this.shareService.getBayTime().toISOString())
    var start = this.shareService.getBayTime()
    start.subtract(this.shareService.real_time_data_range, 'm')
    start = this.shareService.getTimeFormat(start.toISOString())
    var crop_user_id = this.shareService.getCropUserId()

    this.backendService.getWaterHistory(crop_user_id, start, end).subscribe(data => {
        if (data && 200 === data.status) {
          setTimeout(() => {
            var water_history = data.json()

            this.shareService.real_time_water_consumption_data[0][0].data = new Array(water_history.length) 
            this.shareService.real_time_water_consumption_label[0] = new Array(water_history.length)

            for (var i = 0;i < water_history.length; ++i) {
              this.shareService.real_time_water_consumption_data[0][0].data[i] = parseFloat(water_history[i].water_consumption)
              var datetime = water_history[i].creation_date.split('T')
              var time = datetime[1].split('.')
              this.shareService.real_time_water_consumption_label[0][i] = time[0]
            }

            this.callDailyUsedWater()
          });
        } else {
          this.showError("Get water history failed");
        }
      },
      error => {
        this.showError(error);
      });
  }

  callDailyUsedWater() {
    var crop_user_id = this.shareService.getCropUserId()
    var start = this.shareService.getBayTime()
    start.hour(0)
    start.minute(0)
    start.second(0)
    var end = this.shareService.getBayTime()
 
    this.backendService.getDailyUsedWater(crop_user_id, start.format('MM-DD-YYYY HH:mm'), end.format('MM-DD-YYYY HH:mm')).subscribe(data => {
        if (data && 200 === data.status) {
          setTimeout(() => {
            var used = data.json()

            this.shareService.real_time_daily_water_usage_data[0] = parseFloat(used.total)
            
            this.callDailyWaterLimit()
          });
        } else {
          this.showError("Get water history failed");
        }
      },
      error => {
        this.showError(error);
      });
  }

  callDailyWaterLimit() {
    var crop_user_id = this.shareService.getCropUserId()
    var date = this.shareService.getBayTime().format('YYYY-MM-DD')

    this.backendService.getDailyWaterLimit(crop_user_id, date).subscribe(data => {
        if (data && 200 === data.status) {
          setTimeout(() => {
            var limit = data.json()

            this.shareService.daily_limit = parseFloat(limit.prediction)
            this.shareService.real_time_daily_water_usage_data[1] = this.shareService.daily_limit - this.shareService.real_time_daily_water_usage_data[0]
            
            if (this.shareService.real_time_daily_water_usage_data[1] < 0) {
              this.shareService.real_time_daily_water_usage_data[1] = 0
            }

            var ratio = 100.0 * (this.shareService.real_time_daily_water_usage_data[0] / this.shareService.daily_limit)
            
            this.shareService.daily_water_usage_header = "Daily water usage: " + ratio.toFixed(2) + '%'

            this.callGetCrops()
          });
        } else {
          this.showError("Get water history failed");
        }
      },
      error => {
        this.showError(error);
      });
  }

  callGetCrops() {
    this.backendService.getCrops().subscribe(data => {
        if (data && 200 === data.status) {
          setTimeout(() => {
            this.shareService.crops = data.json()
            this.setupSocket()
          });
        } else {
          this.showError("Get water history failed");
        }
      },
      error => {
        this.showError(error);
      });
  }

  setupSocket() {
    var crop_user_id = this.shareService.getCropUserId()
    this.shareService.socket.emit('register', crop_user_id)
    
    this.shareService.isDataAvailable = true
    this.loading.dismiss()
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Retrieving your info...'
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
