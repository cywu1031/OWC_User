import { Component, ViewChild } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { BackendService } from '../providers/backend-service';
import { ShareService } from '../providers/shareservice';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html',
  providers: [BackendService, ShareService]
})

export class MyApp {
  rootPage = LoginPage;
  @ViewChild('myNav') nav;
 
  constructor(platform: Platform, public alertCtrl: AlertController, private backendService: BackendService, private shareService: ShareService) {
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
  }
}
