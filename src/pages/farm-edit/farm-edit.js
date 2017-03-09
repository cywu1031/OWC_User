var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ShareService } from '../tabs/shareservice';
/*
  Generated class for the FarmEdit page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var FarmEditPage = (function () {
    function FarmEditPage(navCtrl, navParams, alertCtrl, shareService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.shareService = shareService;
        this.func = navParams.get('func');
        // this.shareService.title = this.func;
        if ('Create' === this.func) {
            this.farm = {
                name: '',
                stage: '',
                soil_type: '',
                field_size: '',
                description: ''
            };
            this.color = '';
        }
        else {
            this.origin_farm = navParams.get('farm');
            this.farm = Object.create(this.origin_farm); // Make a copy of it
            this.color = 'secondary';
        }
    }
    FarmEditPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FarmEditPage');
    };
    FarmEditPage.prototype.confirm = function () {
        var _this = this;
        var msg = 'Name: ' + this.farm.name +
            '<br>Stage: ' + this.farm.stage +
            '<br>Soil type: ' + this.farm.soil_type +
            '<br>Field size: ' + this.farm.field_size +
            '<br>Description: ' + this.farm.description;
        var confirm = this.alertCtrl.create({
            title: 'Confirm',
            message: msg,
            buttons: [
                {
                    text: 'Cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Agree',
                    handler: function () {
                        console.log('Agree clicked');
                        _this.navCtrl.pop();
                    }
                }
            ]
        });
        confirm.present();
    };
    return FarmEditPage;
}());
FarmEditPage = __decorate([
    Component({
        selector: 'page-farm-edit',
        templateUrl: 'farm-edit.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams,
        AlertController, ShareService])
], FarmEditPage);
export { FarmEditPage };
//# sourceMappingURL=farm-edit.js.map