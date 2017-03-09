import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the FarmDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-farm-detail',
  templateUrl: 'farm-detail.html'
})
export class FarmDetailPage {
  farm: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.farm = navParams.get('farm');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FarmDetailPage');
  }

}
