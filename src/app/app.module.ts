import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HistoryPage } from '../pages/history/history';
import { AnalysisPage } from '../pages/analysis/analysis';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ManagementPage } from '../pages/management/management';
import { TabsPage } from '../pages/tabs/tabs';
import { FarmDetailPage } from '../pages/farm-detail/farm-detail';
import { FarmEditPage } from '../pages/farm-edit/farm-edit'; 
import { LoginPage } from '../pages/login/login';

@NgModule({
  declarations: [
    MyApp,
    HistoryPage,
    AnalysisPage,
    DashboardPage,
    ManagementPage,
    TabsPage,
    FarmDetailPage,
    FarmEditPage,
    LoginPage
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
    FarmDetailPage,
    FarmEditPage,
    LoginPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
