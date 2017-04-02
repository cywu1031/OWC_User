import { Component, NgZone } from '@angular/core';
import { Tab, LoadingController, Loading, AlertController } from 'ionic-angular';

import { DashboardPage } from '../dashboard/dashboard';
import { HistoryPage } from '../history/history';
import { AnalysisPage } from '../analysis/analysis';
import { ManagementPage } from '../management/management';
import { ShareService } from '../../providers/shareservice';
import { BackendService } from '../../providers/backend-service';
import { Observable } from 'rxjs/Rx';
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
    this.loadCropUserInfo()
  }

  ionViewDidLoad() {
  }

  tabChange(tab: Tab){
  }

  loadCropUserInfo() {
    this.showLoading();

    this.backendService.getCropUser(this.shareService.user_info._id).subscribe(allowed => {
        if (allowed) {
          setTimeout(() => {
          this.shareService.sensor_info = new Array(this.shareService.crop_user.length)
          for (var i = 0;i < this.shareService.sensor_info.length; ++i) {
            this.shareService.sensor_info[i] = new Array()
          }
          this.shareService.updateCropUser()

          this.loadSensorInfo()
          });
        } else {
          this.showError("Get crop user failed");
        }
      },
      error => {
        this.showError(error);
      });
  }

  loadSensorInfo() {
    if (0 === this.shareService.crop_user.length) {
      this.showError("No crop user")
      return
    }

    this.callSensorInfoService(0, 0)
  }

  callSensorInfoService(crop_user_idx, sensor_idx) {
    // Got all sensor info 
    if (crop_user_idx + 1 > this.shareService.crop_user.length) {
      // this.loading.dismiss()
      this.loadSensorData()
      return
    }

    if (sensor_idx + 1 > this.shareService.crop_user[crop_user_idx].sensors.length) {
      this.callSensorInfoService(crop_user_idx + 1, 0)
      return
    }

    this.backendService.getSensorInfo(this.shareService.crop_user[crop_user_idx].sensors[sensor_idx], crop_user_idx).subscribe(allowed => {
        if (allowed) {
          setTimeout(() => {
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

  loadSensorData() {
    this.backendService.getSensorData(this.backendService.getSensorDataUrl()).subscribe(allowed => {
        if (allowed) {
          setTimeout(() => {
          this.shareService.isDataAvailable = true
          this.loading.dismiss()
          });
        } else {
          this.showError("Get crop user failed");
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
