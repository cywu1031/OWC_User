import { Component, ViewChild, NgZone } from '@angular/core';
import { Platform, AlertController, LoadingController, Loading } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { BackendService } from '../providers/backend-service';
import { ShareService } from '../providers/shareservice';
import { LoginPage } from '../pages/login/login';

// import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';

@Component({
  templateUrl: 'app.html',
  providers: [BackendService, ShareService]
})

export class MyApp {
  rootPage = LoginPage;
  @ViewChild('myNav') nav;
  loading: Loading;
  clicked_crop_user: any
 
  constructor(platform: Platform, public alertCtrl: AlertController, private backendService: BackendService, 
              private shareService: ShareService, public http: Http, private zone: NgZone, 
              private loadingCtrl: LoadingController) {
    // Catch back button event for Android
    // Prevent use going back to login page
    platform.registerBackButtonAction(() => {
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
    this.clicked_crop_user = 0
  }

  ngAfterViewInit() {
    this.nav.push(LoginPage);
  }

  logoutSelected() {
    let confirm = this.alertCtrl.create({
      title: '',
      message: 'Do you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.backendService.logout().subscribe(succ => {
                this.nav.setRoot(LoginPage)
                this.shareService.isDataAvailable = false
                this.shareService.selected_crop_user = '0'
            });
          }
        }
      ]
    });

    confirm.present();
  }

  selectedFarm() {
    this.shareService.socket.emit('unregister', this.shareService.getCropUserId())
    this.shareService.selected_crop_user = this.clicked_crop_user
    this.shareService.updateCropUser()
    this.shareService.socket.emit('register', this.shareService.getCropUserId())

    this.shareService.isDataAvailable = false
    
    this.showLoading();

    var selected_crop_user_idx = parseInt(this.shareService.selected_crop_user)
    var end = this.shareService.getBayTime()
    var start = this.shareService.getBayTime()
    start.subtract(this.shareService.real_time_data_range, 'm')

    this.loadSensorData(selected_crop_user_idx, 0, start, end)
  }

  
  loadSensorData(crop_user_idx, sensor_idx, start, end) {
    if (sensor_idx >= this.shareService.sensor_info[crop_user_idx].length) {
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
    var end = this.shareService.getBayTime()
    var start = this.shareService.getBayTime()
    start.subtract(this.shareService.real_time_data_range, 'm')
    var crop_user_id = this.shareService.getCropUserId()

    this.backendService.getWaterHistory(crop_user_id, start.format('MM-DD-YY HH:mm'), end.format('MM-DD-YY HH:mm')).subscribe(data => {
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

            this.shareService.isDataAvailable = true
            this.loading.dismiss()
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
