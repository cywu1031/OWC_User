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
            });
          }
        }
      ]
    });

    confirm.present();
  }

  selectedFarm() {
    this.shareService.updateCropUser()

    this.shareService.isDataAvailable = false

    this.showLoading()

    var selected_crop_user_idx = parseInt(this.shareService.selected_crop_user)

    var end = this.shareService.getBayTime()
    var start = this.shareService.getBayTime()
    start.subtract(this.shareService.real_time_data_range, 'm')

    this.loadSensorData(selected_crop_user_idx, 0, start.toISOString(), end.toISOString())
  }

  loadSensorData(crop_user_idx, sensor_idx, start, end) {
    if (sensor_idx >= this.shareService.sensor_info.length) {
      this.shareService.isDataAvailable = true
      this.loading.dismiss()
      // this.callWaterHistory()
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

          for (var i = 0;i < sensor_history.length; ++i) {
            this.shareService.real_time_sensor_data[sensor_idx][0].data[i] = parseFloat(sensor_history[i].value)
            this.shareService.real_time_sensor_data_label[sensor_idx][i] = sensor_history[i].creation_date
          }

          this.loadSensorData(crop_user_idx, sensor_idx + 1, start, end)
        });
      } else {
        this.showError("Get sensor id failed");
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
