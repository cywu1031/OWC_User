import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { RealTimeChartPage } from '../real-time-chart/real-time-chart'

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {
  sensors: any[];
  weathers: any[];

  constructor(public navCtrl: NavController) {
    this.initSensors();
    this.initWeathers();
  }

  initSensors() {
    this.sensors = [];

    this.sensors.push({
        name: "Soil moisture",
        latest: "20",
        last10: []
    });

    this.sensors.push({
        name: "Temperature",
        latest: "32",
        last10: []
    });

    this.sensors.push({
        name: "Humidity",
        latest: "40",
        last10: []
    });
  }

  initWeathers() {
    this.weathers = [];

    this.weathers.push({
        name: "Percipitation",
        latest: "60",
        last10: []
    });

    this.weathers.push({
        name: "Wind speed",
        latest: "33",
        last10: []
    });

    this.weathers.push({
        name: "Solar radiation",
        latest: "67",
        last10: []
    });
  }

  clickSensorButton(sensor) {
    this.navCtrl.push(RealTimeChartPage, {
        item: sensor
    })
  }

  clickWeatherButton(weather) {
    this.navCtrl.push(RealTimeChartPage, {
        item: weather
    })
  }
}
