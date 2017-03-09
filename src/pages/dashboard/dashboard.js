var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
var DashboardPage = (function () {
    function DashboardPage(navCtrl) {
        this.navCtrl = navCtrl;
        this.sensor_count = 3;
        this.weather_count = 3;
        this.irrigation_button_color = '';
        this.manual = false;
        this.irrigation_button_caption = 'Start';
        this.initSensorData();
        this.initWeatherData();
    }
    DashboardPage.prototype.initSensorData = function () {
        this.sensor_data = [];
        // Soil moisture, Temperature, Humidity
        for (var i = 0; i < this.sensor_count; ++i) {
            this.sensor_data.push({
                latest: "",
                last10: []
            });
        }
    };
    DashboardPage.prototype.initWeatherData = function () {
        this.weather_data = [];
        // Percipitation, Wind speed, Solar radiation
        for (var i = 0; i < this.weather_count; ++i) {
            this.weather_data.push({
                latest: "",
                last10: []
            });
        }
    };
    DashboardPage.prototype.irrigateSelected = function () {
        if ('Start' === this.irrigation_button_caption) {
            this.irrigation_button_caption = 'Stop';
            this.irrigation_button_color = 'danger';
        }
        else {
            this.irrigation_button_caption = 'Start';
            this.irrigation_button_color = '';
        }
    };
    DashboardPage.prototype.toggleChanged = function () {
        this.irrigation_button_caption = 'Start';
        this.irrigation_button_color = '';
    };
    return DashboardPage;
}());
__decorate([
    ViewChild('soilMoistureCanvas'),
    __metadata("design:type", Object)
], DashboardPage.prototype, "soilMoistureCanvas", void 0);
__decorate([
    ViewChild('temperatureCanvas'),
    __metadata("design:type", Object)
], DashboardPage.prototype, "temperatureCanvas", void 0);
__decorate([
    ViewChild('humidityCanvas'),
    __metadata("design:type", Object)
], DashboardPage.prototype, "humidityCanvas", void 0);
__decorate([
    ViewChild('percipitationCanvas'),
    __metadata("design:type", Object)
], DashboardPage.prototype, "percipitationCanvas", void 0);
__decorate([
    ViewChild('windSpeedCanvas'),
    __metadata("design:type", Object)
], DashboardPage.prototype, "windSpeedCanvas", void 0);
__decorate([
    ViewChild('solarRadiationCanvas'),
    __metadata("design:type", Object)
], DashboardPage.prototype, "solarRadiationCanvas", void 0);
DashboardPage = __decorate([
    Component({
        selector: 'page-dashboard',
        templateUrl: 'dashboard.html'
    }),
    __metadata("design:paramtypes", [NavController])
], DashboardPage);
export { DashboardPage };
//# sourceMappingURL=dashboard.js.map