import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ShareService } from '../../providers/shareservice';

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
  crop_name: any
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private shareService: ShareService) {
      this.farm = navParams.get('farm');
      for (var i = 0;i < this.shareService.crops.length;++i) {
        if (this.shareService.crops[i]._id === this.farm.crop_id) {
          this.crop_name = this.shareService.crops[i].name
          break
        }
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FarmDetailPage');
  }

}
