import { Component, ViewChild } from '@angular/core';

import { NavController, PopoverController } from 'ionic-angular';

import { ShareService } from '../../providers/shareservice';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {
  sensor_data: any[];
  sensor_count = 3;  
  @ViewChild('soilMoistureCanvas') soilMoistureCanvas;
  @ViewChild('temperatureCanvas') temperatureCanvas;
  @ViewChild('humidityCanvas') humidityCanvas;

  weather_data: any[];
  weather_count = 3;
  @ViewChild('percipitationCanvas') percipitationCanvas;
  @ViewChild('windSpeedCanvas') windSpeedCanvas;
  @ViewChild('solarRadiationCanvas') solarRadiationCanvas;

  manual: any;
  irrigation_button_caption: any;
  irrigation_button_color: any;

  constructor(public navCtrl: NavController, private shareService: ShareService, private popoverCtrl: PopoverController) {
    this.irrigation_button_color = '';
    this.manual = false;
    this.irrigation_button_caption = 'Start';
    this.initSensorData();
    this.initWeatherData();
    this.shareService.title = 'Dashboard';
  }

  initSensorData() {
    this.sensor_data = [];

    // Soil moisture, Temperature, Humidity
    for (var i = 0; i < this.sensor_count; ++i) {
        this.sensor_data.push({
            latest: "",
            last10: []
        });
    }
  }

  initWeatherData() {
    this.weather_data = [];

     // Percipitation, Wind speed, Solar radiation
    for (var i = 0; i < this.weather_count; ++i) {
        this.weather_data.push({
            latest: "",
            last10: []
        });
    }
  }

  irrigateSelected() {
    if ('Start' === this.irrigation_button_caption) {
      this.irrigation_button_caption = 'Stop';
      this.irrigation_button_color = 'danger';
    } else {
      this.irrigation_button_caption = 'Start';
      this.irrigation_button_color = '';
    }
  }

  toggleChanged() {
    this.irrigation_button_caption = 'Start';
    this.irrigation_button_color = '';
  }
}
