import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController, LoadingController, Loading } from 'ionic-angular';
import { BackendService } from '../../providers/backend-service';
import { ShareService } from '../../providers/shareservice';

/*
  Generated class for the FarmEdit page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-farm-edit',
  templateUrl: 'farm-edit.html',
})
export class FarmEditPage {
  farm: any;
  origin_farm: any;
  func: any;
  color: any;
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public alertCtrl: AlertController, private loadingCtrl: LoadingController,
              private backendService: BackendService, private shareService: ShareService) {
      this.func = navParams.get('func');

      if ('Create' === this.func) {
          this.farm = {
              name: '',
              stage: '',
              field_capacity: '',
              field_size: '',
              mad: '',
              description: ''
          };

          this.color = ''
      } else {
          this.origin_farm = navParams.get('farm');
          this.farm = Object.create(this.origin_farm); // Make a copy of it
          this.color = 'secondary';
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FarmEditPage');
  }

  confirm() {
    let msg = 'Name: ' + this.farm.name + 
              '<br>Stage: ' + this.farm.stage + 
              '<br>Field capacity: ' + this.farm.field_capacity + 
              '<br>Field size: ' + this.farm.field_size + 
              '<br>Garden size: ' + this.farm.acreage +
              '<br>MAD: ' + this.farm.mad + 
              '<br>Water pouring time: ' + this.farm.water_pouring_time +
              '<br>Description: ' + this.farm.description;

    let confirm = this.alertCtrl.create({
    title: 'Confirm',
    message: msg,
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
            this.showLoading();

            if ('Create' === this.func) {
                
            } else {
                this.backendService.updateCropUser(this.farm._id, this.farm).subscribe(allowed => {
                  if (allowed) {
                    setTimeout(() => {
                    for (var i = 0;i < this.shareService.crop_user.length; ++i) {
                      if (this.shareService.crop_user[i]._id === allowed._id) {
                        this.shareService.crop_user[i] = allowed
                        break
                      }
                    }

                    this.loading.dismiss();
                    this.navCtrl.pop();
                    });
                  } else {
                    this.loading.dismiss();
                    this.showError("Update failed");
                  }
                },
                error => {
                  this.showError(error);
                });
            }
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
