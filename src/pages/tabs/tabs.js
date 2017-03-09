var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { DashboardPage } from '../dashboard/dashboard';
import { HistoryPage } from '../history/history';
import { AnalysisPage } from '../analysis/analysis';
import { ManagementPage } from '../management/management';
import { ShareService } from './shareservice';
var TabsPage = (function () {
    function TabsPage(shareService) {
        this.shareService = shareService;
        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.tab1Root = DashboardPage;
        this.tab2Root = HistoryPage;
        this.tab3Root = AnalysisPage;
        this.tab4Root = ManagementPage;
    }
    TabsPage.prototype.tabChange = function (tab) {
        switch (tab.index) {
            case 0:
                this.shareService.title = 'Dashboard';
                break;
            case 1:
                this.shareService.title = 'History';
                break;
            case 2:
                this.shareService.title = 'Analysis';
                break;
            case 3:
                this.shareService.title = 'Management';
                break;
            default:
                alert('Unknown tab index ' + tab.index);
                break;
        }
        ;
    };
    return TabsPage;
}());
TabsPage = __decorate([
    Component({
        templateUrl: 'tabs.html',
        providers: [ShareService]
    }),
    __metadata("design:paramtypes", [ShareService])
], TabsPage);
export { TabsPage };
//# sourceMappingURL=tabs.js.map