import { Component } from '@angular/core';
import { AlertController, NavController, LoadingController, Loading } from 'ionic-angular';
import { BackendService } from '../../providers/backend-service';
import { TabsPage } from '../tabs/tabs';
import { ShareService } from '../../providers/shareservice';

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

  constructor(public navCtrl: NavController, private backendService: BackendService, 
              private loadingCtrl: LoadingController, private alertCtrl: AlertController,
              private shareService: ShareService) {
  }

  loginSelected() {
      this.showLoading();

      this.backendService.login(this.registerCredentials).subscribe(data => {
        if (data && 200 === data.status) {
          setTimeout(() => {
            this.shareService.user_info = data.json()
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
