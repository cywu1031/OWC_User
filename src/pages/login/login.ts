import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { RestService } from '../../providers/rest-service';
import { TabsPage } from '../tabs/tabs';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, private authService: AuthService, private restService: RestService) {
  }

  ionViewDidLoad() {
  }

  loginSelected() {
      this.restService.login().subscribe(
                data => {
                    alert(data);
                    this.navCtrl.push(TabsPage);
                },
                err => {
                    console.log(err);
                },
                () => console.log('Movie Search Complete')
            );
      // this.authService.isLogin = true;
      // this.navCtrl.push(TabsPage);
  }
}
