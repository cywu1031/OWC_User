import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HistoryPage } from '../pages/history/history';
import { AnalysisPage } from '../pages/analysis/analysis';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';

@NgModule({
  declarations: [
    MyApp,
    HistoryPage,
    AnalysisPage,
    DashboardPage,
    SettingsPage,
    TabsPage
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
    SettingsPage,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
