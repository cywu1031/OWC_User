import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { ShareService } from '../../providers/shareservice';

@Component({
  selector: 'page-analysis',
  templateUrl: 'analysis.html'
})
export class AnalysisPage {

  constructor(public navCtrl: NavController, public shareService: ShareService) {
      this.shareService.title = 'Analysis';
  }

}
