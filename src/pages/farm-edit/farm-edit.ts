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
      this.farm = {
              crop_id: '',
              user_id: '',
              name: '',
              description: '',
              stage: '',
              field_size: '',
              field_capacity: '',
              acreage: '',
              mad: '',
              water_pouring_time: ''
          };

      if ('Create' === this.func) {
          this.color = ''
      } else {
          this.origin_farm = navParams.get('farm');
          this.farm._id = this.origin_farm._id
          this.farm.crop_id = this.origin_farm.crop_id
          this.farm.user_id = this.origin_farm.user_id
          this.farm.name = this.origin_farm.name
          this.farm.description = this.origin_farm.description
          this.farm.stage = this.origin_farm.stage
          this.farm.field_size = this.origin_farm.field_size
          this.farm.field_capacity = this.origin_farm.field_capacity
          this.farm.acreage = this.origin_farm.acreage
          this.farm.mad = this.origin_farm.mad
          this.farm.water_pouring_time = this.origin_farm.water_pouring_time

          this.color = 'secondary';

          for (var i = 0;i < this.shareService.crops.length;++i) {
            if (this.shareService.crops[i]._id === this.farm.crop_id) {
              this.farm.crop_id = this.shareService.crops[i]._id
              break
            }
          }
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FarmEditPage');
  }

  confirm() {
    var crop_name = ''
    for (var i = 0;i < this.shareService.crops.length;++i) {
      if (this.shareService.crops[i]._id === this.farm.crop_id) {
        crop_name = this.shareService.crops[i].name
        break
      }
    }

    let msg = 'Name: ' + this.farm.name + 
              '<br>Stage: ' + this.farm.stage + 
              '<br>Crop: ' + crop_name +
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
            this.farm.mad = this.farm.mad.toString()
            this.farm.water_pouring_time = this.farm.water_pouring_time.toString()
            if ('Create' === this.func) {

                this.farm.user_id = this.shareService.user_info._id

                this.backendService.createCropUser(this.farm).subscribe(data => {
                  if (data) {
                    setTimeout(() => {
                      var jdata = JSON.parse(data._body);
                      this.shareService.crop_user.push(jdata)
                      this.loading.dismiss();
                      this.navCtrl.pop();
                    });
                  } else {
                    this.loading.dismiss();
                    this.showError("Create failed");
                  }
                },
                error => {
                  this.showError(error);
                });
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
