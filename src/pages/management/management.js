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
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FarmDetailPage } from '../farm-detail/farm-detail';
import { FarmEditPage } from '../farm-edit/farm-edit';
var ManagementPage = (function () {
    function ManagementPage(navCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.getFarms();
    }
    ManagementPage.prototype.ionViewDidEnter = function () {
    };
    ManagementPage.prototype.getFarms = function () {
        this.farms = [];
        this.farms.push({
            name: 'Farm1',
            stage: '2',
            soil_type: 'clay',
            field_size: '12',
            description: 'Test'
        });
    };
    ManagementPage.prototype.farmSelected = function (farm) {
        this.navCtrl.push(FarmDetailPage, {
            farm: farm
        });
    };
    ManagementPage.prototype.createSelected = function () {
        this.navCtrl.push(FarmEditPage, {
            func: 'Create'
        });
    };
    ManagementPage.prototype.updateSelected = function (farm) {
        this.navCtrl.push(FarmEditPage, {
            func: 'Update',
            farm: farm
        });
        alert('in');
    };
    ManagementPage.prototype.deleteSelected = function (farm) {
        var confirm = this.alertCtrl.create({
            title: 'Warning',
            message: 'You can not recover deleted farm, continue?',
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
                    }
                }
            ]
        });
        confirm.present();
    };
    return ManagementPage;
}());
ManagementPage = __decorate([
    Component({
        selector: 'page-management',
        templateUrl: 'management.html'
    }),
    __metadata("design:paramtypes", [NavController, AlertController])
], ManagementPage);
export { ManagementPage };
//# sourceMappingURL=management.js.map