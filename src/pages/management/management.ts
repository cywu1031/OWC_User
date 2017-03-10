import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { AlertController } from 'ionic-angular';

import { FarmDetailPage } from '../farm-detail/farm-detail';

import { FarmEditPage } from '../farm-edit/farm-edit';

import { ShareService } from '../../providers/shareservice';

@Component({
  selector: 'page-management',
  templateUrl: 'management.html'
})
export class ManagementPage {
  farms: any[];

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public shareService: ShareService) {
      this.getFarms();
      this.shareService.title = 'Management';
  }

  ionViewDidEnter() {
  }

  getFarms() {
      this.farms = [];

      this.farms.push({
          name: 'Farm1',
          stage: '2',
          soil_type: 'clay',
          field_size: '12',
          description: 'Test'
      });
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
            console.log('Agree clicked');
          }
        }
      ]
    });

    confirm.present();
  }
}
