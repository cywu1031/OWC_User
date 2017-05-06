import { Component, NgZone, ViewChild } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';

import { ShareService } from '../../providers/shareservice';

import { ChartSetting } from '../../providers/chart-setting';

import { BackendService } from '../../providers/backend-service';

import { BaseChartDirective } from 'ng2-charts/ng2-charts';


@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  providers: [ChartSetting]
})

export class DashboardPage {
  @ViewChild('real_time_water') real_time_water: BaseChartDirective;
  @ViewChild('water_usage') water_usage: BaseChartDirective;
  @ViewChild('hum') hum_chart: BaseChartDirective;
  @ViewChild('soil') soil_chart: BaseChartDirective;
  @ViewChild('temp') temp_chart: BaseChartDirective;

  manual: any;
  update_interval: any
  water_canvas: any
  irrigate: any
  mad: any
  pouring_time: any
  constructor(public navCtrl: NavController, private shareService: ShareService, 
              private chartSetting: ChartSetting, private alertCtrl: AlertController, 
              private backendService: BackendService, private zone: NgZone) {
    this.manual = false;
    this.irrigate = false;
    // this.initSensorData();
    this.shareService.title = 'Dashboard';
    this.chartSetting.lineChartLabels = [['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                       ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                       ['January', 'February', 'March', 'April', 'May', 'June', 'July']];
  }

  two_digits(num) {
    if (num < 10) {
      return '0' + num.toString()
    }

    return num.toString()
  }

  ionViewDidLoad() {
    var crop_user_id = this.shareService.getCropUserId()
    
    this.shareService.socket.on(crop_user_id, (msg) =>{
      this.zone.run(() =>{
        var split = msg.split(',')
        var time  = new Date(parseInt(split[2]))
        time.setHours(time.getHours() + 7)
        var label = this.two_digits(Number(time.getHours())) + ':' +
                    this.two_digits(Number(time.getMinutes())) + ':' + 
                    this.two_digits(Number(time.getSeconds()))

        if ('water' === split[0]) {
          if (this.shareService.real_time_water_consumption_data[0][0].data.length === 0) {
            this.shareService.real_time_water_consumption_label[0] = []
          }

          this.shareService.real_time_water_consumption_data[0][0].data.push(parseInt(split[1]))
          this.shareService.real_time_water_consumption_label[0].push(label)

          if (this.shareService.real_time_water_consumption_data[0][0].data.length > 10) {
            this.shareService.real_time_water_consumption_data[0][0].data.shift()
            this.shareService.real_time_water_consumption_label[0].shift()
          }

          this.shareService.real_time_daily_water_usage_data[0] += parseFloat(split[1])
          this.shareService.real_time_daily_water_usage_data[1] -= parseFloat(split[1])

          if (this.shareService.real_time_daily_water_usage_data[1] < 0) {
            this.shareService.real_time_daily_water_usage_data[1] = 0
          }

          var ratio = 100.0 * (this.shareService.real_time_daily_water_usage_data[0] / this.shareService.daily_limit)
          
          this.shareService.daily_water_usage_header = "Daily water usage: " + ratio.toFixed(2) + '%'

          this.water_usage.ngOnChanges({});
          this.real_time_water.ngOnChanges({});
          
        } else if ('arduino-hum' === split[0]) {
          this.shareService.real_time_sensor_data[0][0].data.push(parseInt(split[1]))
          this.shareService.real_time_sensor_data[0][0].data.shift()
          this.shareService.real_time_sensor_data_label[0].push(label)
          this.shareService.real_time_sensor_data_label[0].shift()
          this.hum_chart.ngOnChanges({});
        } else if ('arduino-soil' === split[0]) {
          this.shareService.real_time_sensor_data[1][0].data.push(parseInt(split[1]))
          this.shareService.real_time_sensor_data[1][0].data.shift()
          this.shareService.real_time_sensor_data_label[1].push(label)
          this.shareService.real_time_sensor_data_label[1].shift()
          this.soil_chart.ngOnChanges({});
        } else {
          this.shareService.real_time_sensor_data[2][0].data.push(parseInt(split[1]))
          this.shareService.real_time_sensor_data[2][0].data.shift()
          this.shareService.real_time_sensor_data_label[2].push(label)
          this.shareService.real_time_sensor_data_label[2].shift()
          this.temp_chart.ngOnChanges({});
        }

        // this.refresh_chart(split[0])
      });
    });

  }

  // refresh_chart(chart) {
  //       setTimeout(() => {
  //           if ('water' === chart && this.real_time_water && this.real_time_water.chart && this.real_time_water.chart.config) {
  //             this.real_time_water.chart.config.data.labels = this.shareService.real_time_water_consumption_label[0]
  //             this.real_time_water.chart.config.data.datasets = this.shareService.real_time_water_consumption_data[0]
  //             this.real_time_water.chart.config.options = this.chartSetting.lineChartOptions
  //             this.real_time_water.chart.config.colors = this.chartSetting.lineChartColors[0]
  //             this.real_time_water.chart.config.legend = this.chartSetting.lineChartLegend
  //             this.real_time_water.chart.update();
  //           } else if ('arduino-hum' === chart){
  //             if (this.hum_chart && this.hum_chart.chart && this.hum_chart.chart.config) {
  //               this.hum_chart.chart.config.data.labels = this.shareService.real_time_sensor_data_label[0]
  //               this.hum_chart.chart.config.data.datasets = this.shareService.real_time_sensor_data[0]
  //               this.hum_chart.chart.config.options = this.chartSetting.lineChartOptions
  //               this.hum_chart.chart.config.colors = this.chartSetting.lineChartColors[0]
  //               this.hum_chart.chart.config.legend = this.chartSetting.lineChartLegend
  //               this.hum_chart.chart.update();
  //             }
  //           } else if ('arduino-soil' === chart) {
  //             if (this.soil_chart && this.soil_chart.chart && this.soil_chart.chart.config) {
  //               this.soil_chart.chart.config.data.labels = this.shareService.real_time_sensor_data_label[1]
  //               this.soil_chart.chart.config.data.datasets = this.shareService.real_time_sensor_data[1]
  //               this.soil_chart.chart.config.options = this.chartSetting.lineChartOptions
  //               this.soil_chart.chart.config.colors = this.chartSetting.lineChartColors[0]
  //               this.soil_chart.chart.config.legend = this.chartSetting.lineChartLegend
  //               this.soil_chart.chart.update();
  //             }
  //           } else {
  //             if (this.temp_chart && this.temp_chart.chart && this.temp_chart.chart.config) {
  //               this.temp_chart.chart.config.data.labels = this.shareService.real_time_sensor_data_label[2]
  //               this.temp_chart.chart.config.data.datasets = this.shareService.real_time_sensor_data[2]
  //               this.temp_chart.chart.config.options = this.chartSetting.lineChartOptions
  //               this.temp_chart.chart.config.colors = this.chartSetting.lineChartColors[0]
  //               this.temp_chart.chart.config.legend = this.chartSetting.lineChartLegend
  //               this.temp_chart.chart.update();
  //             }
  //           }
  //       });
  //   }

  irrigateSelected() {

  }

  toggleChanged() {
    var onoff = 'off'
    if (this.irrigate) {
      onoff = 'on'
    }

    this.backendService.switchValve(onoff).subscribe(data => {
        if (data && 200 === data.status) {
          setTimeout(() => {
          });
        } else {
          this.showError("Fail to control the valve");
          this.irrigate = !this.irrigate
        }
      },
      error => {
        this.showError(error);
      });
  }

  showError(text) {
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}
