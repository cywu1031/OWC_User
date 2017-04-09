import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { ShareService } from '../../providers/shareservice';

@Component({
  selector: 'page-analysis',
  templateUrl: 'analysis.html'
})
export class AnalysisPage {
  data_ready: any
  range: any
  constructor(public navCtrl: NavController, private shareService: ShareService) {
      this.shareService.title = 'Analysis';
      this.data_ready = false
      this.range = 'ThreeDay'
  }

  onRangeSelected() {
      var a = this.range
  }
}
