import { Component } from '@angular/core';
import { Tab, LoadingController, Loading, AlertController } from 'ionic-angular';

import { DashboardPage } from '../dashboard/dashboard';
import { HistoryPage } from '../history/history';
import { AnalysisPage } from '../analysis/analysis';
import { ManagementPage } from '../management/management';
import { ShareService } from '../../providers/shareservice';
import { BackendService } from '../../providers/backend-service';

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
              private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
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
    if (crop_user_idx + 1 > this.shareService.crop_user.length) {
      this.loading.dismiss()
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
