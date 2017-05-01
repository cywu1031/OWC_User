import { Component, NgZone } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';

import { ShareService } from '../../providers/shareservice';

import { ChartSetting } from '../../providers/chart-setting';

import { BackendService } from '../../providers/backend-service';

import Chart from 'chart.js'

// import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';

import * as io from 'socket.io-client';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  providers: [ChartSetting]
})

export class DashboardPage {
  manual: any;
  update_interval: any
  socket: any
  water_canvas: any
  irrigate: any
  mad: any
  pouring_time: any
  constructor(public navCtrl: NavController, private shareService: ShareService, 
              private chartSetting: ChartSetting, private alertCtrl: AlertController, 
              private backendService: BackendService, private zone: NgZone, public http: Http) {
    this.manual = false;
    this.irrigate = false;
    // this.initSensorData();
    this.shareService.title = 'Dashboard';
    this.chartSetting.lineChartLabels = [['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                       ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                       ['January', 'February', 'March', 'April', 'May', 'June', 'July']];
    this.water_canvas = document.getElementById('water_canvas')

  }

  ionViewDidLoad() {
    this.socket = io.connect(this.backendService.baseUrl);
    var selected_crop_user_idx = parseInt(this.shareService.selected_crop_user)
    var crop_user_id = this.shareService.crop_user[selected_crop_user_idx]._id

    this.socket.on(crop_user_id, (msg) =>{
      //this.zone.run(() =>{
        let data = this.shareService.real_time_water_consumption_data
        data.push(parseInt(msg))
        delete this.shareService.real_time_water_consumption_data
        
        let label = this.shareService.real_time_water_consumption_label
        label.push('test')
        delete this.shareService.real_time_water_consumption_label

        this.shareService.real_time_water_consumption_data = data
        this.shareService.real_time_water_consumption_label = label

        var option = {
          showLines: true
        };
        var myLineChart = Chart.Line(this.water_canvas,{
                                  data: this.shareService.real_time_water_consumption_data,
                                  labels: this.shareService.real_time_water_consumption_label,
                                  options:option})

        myLineChart.update()

     // });
    });
  }

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
