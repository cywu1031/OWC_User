import { Component } from '@angular/core';

import { DashboardPage } from '../dashboard/dashboard';
import { HistoryPage } from '../history/history';
import { AnalysisPage } from '../analysis/analysis';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = DashboardPage;
  tab2Root: any = HistoryPage;
  tab3Root: any = AnalysisPage;
  tab4Root: any = SettingsPage;

  constructor() {

  }
}
