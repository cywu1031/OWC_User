import { Component } from '@angular/core';

import { NavController, LoadingController, Loading, AlertController } from 'ionic-angular';

import { ShareService } from '../../providers/shareservice';

import { BackendService } from '../../providers/backend-service';

import { ChartSetting } from '../../providers/chart-setting';


@Component({
  selector: 'page-analysis',
  templateUrl: 'analysis.html',
  providers: [ChartSetting]
})

export class AnalysisPage {
  data_ready: any
  loading: Loading;
  range: any
  water_usage_label: any
  water_usage_datasets: any
  date_map: any
  water_optimize_header: any
  prediction_sum: any
  consumption_sum: any
  optimized: any
  start_date_time: any
  end_date_time: any
  constructor(public navCtrl: NavController, private shareService: ShareService, 
    private backendService: BackendService, private loadingCtrl: LoadingController, 
    private alertCtrl: AlertController, private chartSetting: ChartSetting) {
      this.shareService.title = 'Analysis';
      this.data_ready = false
      this.range = 'ThreeDays'

      this.start_date_time = new Date().toISOString()
      this.end_date_time = new Date().toISOString()
  }

  onRangeSelected() {
    this.showLoading();

    this.data_ready = false
    this.water_usage_label = []
    this.water_usage_datasets = []
    this.water_usage_datasets.push({data:[], label:'Daily water usage'})
    this.water_usage_datasets.push({data:[], label:'Daily water limit'})
    this.date_map = {}
    this.prediction_sum = 0
    this.consumption_sum = 0
    this.optimized = 0
    this.getWaterPredictionDaily()
  }

  getWaterPredictionDaily() {    
    var selected_crop_user_idx = parseInt(this.shareService.selected_crop_user)
    var crop_user_id = this.shareService.crop_user[selected_crop_user_idx]._id

    this.start_date_time = this.start_date_time.split('T')[0] + 'T00:00:00.000Z'
    this.end_date_time = this.end_date_time.split('T')[0] + 'T23:59:59.000Z'
    this.backendService.getPredictionRangeDaily(crop_user_id, this.start_date_time, this.end_date_time).subscribe(data => {
        if (data && 200 === data.status) {
          setTimeout(() => {
            var daily_prediction = data.json()

            for (var i = 0;i < daily_prediction.length; ++i) {
              var date = daily_prediction[i].date.split('T')[0]
              this.date_map[date] = i
              this.water_usage_label.push(date)
              this.water_usage_datasets[1].data.push(daily_prediction[i].prediction)
              this.prediction_sum += daily_prediction[i].prediction
            }

            this.prediction_sum = this.prediction_sum.toFixed(2)
            this.getWaterUsageDaily(crop_user_id)
          });
        } else {
          this.showError("Get getPredictionRangeDaily failed");
        }
      },
      error => {
        this.showError(error);
      });
  }

  getWaterUsageDaily(crop_user_id) {
    var split = this.start_date_time.split('T')
    var start_date = split[0].split('-')
    split = this.end_date_time.split('T')
    var end_date = split[0].split('-')

    var start = start_date[1] + '-' + start_date[2] + '-' + start_date[0] + ' 00:00'
    var end = end_date[1] + '-' + end_date[2] + '-' + end_date[0] + ' 23:59'
    this.backendService.getWaterHistory(crop_user_id, start, end).subscribe(data => {
        if (data && 200 === data.status) {
          setTimeout(() => {
            var water_history = data.json()

            if(0 === water_history.length) {
              for (var i = 0;i < this.water_usage_datasets[1].data.length; ++i) {
                this.water_usage_datasets[0].data.push(0)
              }
            } else {
              this.water_usage_datasets[0].data = Array(this.water_usage_label.length)

              for (var i = 0; i < this.water_usage_datasets[0].data.length; ++i) {
                this.water_usage_datasets[0].data[i] = 0
              }

              for (var i = 0;i < water_history.length; ++i) {
                var date = water_history[i].creation_date.split('T')[0]
                this.water_usage_datasets[0].data[this.date_map[date]] += parseInt(water_history[i].water_consumption)
                this.consumption_sum += parseInt(water_history[i].water_consumption)
              }
            }

            this.consumption_sum = this.consumption_sum.toFixed(2)
            if (0 !== this.prediction_sum) {
              this.optimized = this.consumption_sum / this.prediction_sum
              this.optimized *= 100
              this.optimized = 100 - this.optimized
              this.optimized = this.optimized.toFixed(2)
            }

            this.data_ready = true
            this.loading.dismiss()
          });
        } else {
          this.loading.dismiss()
          this.showError("Get getPredictionRangeDaily failed");
        }
      },
      error => {
        this.loading.dismiss()
        this.showError(error);
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Retrieving your info...'
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
