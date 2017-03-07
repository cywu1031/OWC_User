import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HistoryPage } from '../pages/history/history';
import { AnalysisPage } from '../pages/analysis/analysis';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ManagementPage } from '../pages/management/management';
import { TabsPage } from '../pages/tabs/tabs';
import { RealTimeChartPage } from '../pages/real-time-chart/real-time-chart'

@NgModule({
  declarations: [
    MyApp,
    HistoryPage,
    AnalysisPage,
    DashboardPage,
    ManagementPage,
    TabsPage,
    RealTimeChartPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HistoryPage,
    AnalysisPage,
    DashboardPage,
    ManagementPage,
    TabsPage,
    RealTimeChartPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
