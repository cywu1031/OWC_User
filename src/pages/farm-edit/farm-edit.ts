import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the FarmEdit page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-farm-edit',
  templateUrl: 'farm-edit.html'
})
export class FarmEditPage {
  farm: any;
  origin_farm: any;
  func: any;
  color: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
      this.func = navParams.get('func');

      if ('Create' === this.func) {
          this.farm = {
              name: '',
              stage: '',
              soil_type: '',
              field_size: '',
              description: ''
          };

          this.color = ''
      } else {
          this.origin_farm = navParams.get('farm');
          this.farm = Object.create(this.origin_farm); // Make a copy of it
          this.color = 'secondary'
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FarmEditPage');
  }

  confirm() {
    let msg = 'Name: ' + this.farm.name + 
              '<br>Stage: ' + this.farm.stage + 
              '<br>Soil type: ' + this.farm.soil_type + 
              '<br>Field size: ' + this.farm.field_size + 
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
            console.log('Agree clicked');
            this.navCtrl.pop();
          }
        }
      ]
    });

    confirm.present();
  }
}
