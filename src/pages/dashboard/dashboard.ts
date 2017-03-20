import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { ShareService } from '../../providers/shareservice';

import { ChartSetting } from '../../providers/chart-setting';


@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  providers: [ChartSetting]
})

export class DashboardPage {
  manual: any;

  constructor(public navCtrl: NavController, private shareService: ShareService, private chartSetting: ChartSetting) {
    this.manual = false;
    this.initSensorData();
    this.initWeatherData();
    this.shareService.title = 'Dashboard';
  }

  initSensorData() {
    this.chartSetting.lineChartData = [[{data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'}],
        [{data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}],
        [{data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}]]

    this.chartSetting.lineChartLabels = [['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                       ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                       ['January', 'February', 'March', 'April', 'May', 'June', 'July']];
  }

  initWeatherData() {
    // this.weather_data = [];

    //  // Percipitation, Wind speed, Solar radiation
    // for (var i = 0; i < this.weather_count; ++i) {
    //     this.weather_data.push({
    //         latest: "",
    //         last10: []
    //     });
    // }
  }

  irrigateSelected() {
  }

  toggleChanged() {
  }
}
