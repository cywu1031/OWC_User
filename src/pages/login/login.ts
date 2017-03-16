import { Component } from '@angular/core';
import { AlertController, NavController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
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
  loading: Loading;
  registerCredentials = {name: '', password: ''};

  constructor(public navCtrl: NavController, private authService: AuthService, 
              private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
  }

  loginSelected() {
      this.showLoading();

      this.authService.login(this.registerCredentials).subscribe(allowed => {
        if (allowed) {
          setTimeout(() => {
          this.loading.dismiss();
          this.navCtrl.setRoot(TabsPage)
          });
        } else {
          this.showError("Login failed");
        }
      },
      error => {
        this.showError(error);
      });
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
