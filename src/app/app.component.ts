import { Component, ViewChild, NgZone } from '@angular/core';
import { Platform, AlertController, LoadingController, Loading } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { BackendService } from '../providers/backend-service';
import { ShareService } from '../providers/shareservice';
import { LoginPage } from '../pages/login/login';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';

@Component({
  templateUrl: 'app.html',
  providers: [BackendService, ShareService]
})

export class MyApp {
  rootPage = LoginPage;
  @ViewChild('myNav') nav;
  loading: Loading;
 
  constructor(platform: Platform, public alertCtrl: AlertController, private backendService: BackendService, 
              private shareService: ShareService, public http: Http, private zone: NgZone, 
              private loadingCtrl: LoadingController) {
    // Catch back button event for Android
    // Prevent use going back to login page
    platform.registerBackButtonAction(() => {
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

  }

  ngAfterViewInit() {
    this.nav.push(LoginPage);
  }

  logoutSelected() {
    let confirm = this.alertCtrl.create({
      title: '',
      message: 'Do you want to logout?',
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
            this.backendService.logout().subscribe(succ => {
                this.nav.setRoot(LoginPage)
            });
          }
        }
      ]
    });

    confirm.present();
  }

  selectedFarm() {
    this.shareService.updateCropUser()

    this.shareService.isDataAvailable = false

    this.showLoading()

    this.backendService.getSensorData(this.backendService.getSensorDataUrl()).subscribe(allowed => {
        if (allowed) {
          setTimeout(() => {
          this.shareService.isDataAvailable = true
          this.loading.dismiss()
          });
        } else {
          this.showError("Get sensor history failed");
        }
      },
      error => {
        this.showError(error);
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Retrieving your info. Please wait...'
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
