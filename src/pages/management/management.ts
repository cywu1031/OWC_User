import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { AlertController, LoadingController, Loading } from 'ionic-angular';

import { FarmDetailPage } from '../farm-detail/farm-detail';

import { FarmEditPage } from '../farm-edit/farm-edit';

import { ShareService } from '../../providers/shareservice';

import { BackendService } from '../../providers/backend-service';


@Component({
  selector: 'page-management',
  templateUrl: 'management.html'
})
export class ManagementPage {
  loading: Loading;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, 
    private shareService: ShareService, private backendService: BackendService,
    private loadingCtrl: LoadingController) {
      this.shareService.title = 'Management';
  }

  ionViewDidEnter() {
  }

  farmSelected(farm) {
    this.navCtrl.push(FarmDetailPage, {
      farm: farm
    })
  }

  createSelected() {
    this.navCtrl.push(FarmEditPage, {
      func: 'Create'
    })
  }

  updateSelected(farm) {
    this.navCtrl.push(FarmEditPage, {
      func: 'Update',
      farm: farm
    })
  }

  deleteSelected(farm) {
    let confirm = this.alertCtrl.create({
      title: 'Warning',
      message: 'You can not recover deleted farm, continue?',
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
            this.showLoading()
            this.backendService.deleteCropUser(farm._id).subscribe(allowed => {
                  if (allowed) {
                    setTimeout(() => {
                      for (var i = 0;i < this.shareService.crop_user.length; ++i) {
                        if (this.shareService.crop_user[i]._id === farm._id) {
                          this.shareService.crop_user.splice(i, 1)
                          break
                        }
                      }
                      this.loading.dismiss();
                    });
                  } else {
                    this.loading.dismiss();
                    this.showError("Delete failed");
                  }
                },
                error => {
                  this.showError(error);
                });
          }
        }
      ]
    });

    confirm.present();
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
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
