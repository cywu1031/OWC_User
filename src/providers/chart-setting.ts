import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the ChartSetting provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ChartSetting {
    public lineChartData:Array<any> = [];
    public lineChartLabels:Array<any> = [];

    public lineChartOptions:any = {
    responsive: true
    };
    public lineChartColors:Array<any> = [
        [{ // grey
          backgroundColor: 'rgba(255,255,255,0)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }],
        [{ // dark grey
          backgroundColor: 'rgba(255,255,255,0)',
          borderColor: 'rgba(77,83,96,1)',
          pointBackgroundColor: 'rgba(77,83,96,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(77,83,96,1)'
        }],
        [{ // grey
          backgroundColor: 'rgba(255,255,255,0)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }]
    ];
 
    public lineChartLegend:boolean = true;
    public lineChartType:string = 'line';

    public doughnutChartType:string = 'doughnut';

    public pieChartType: string = 'pie'

    public barChartType:string = 'bar';
    public barChartOptions:any = {
      scaleShowVerticalLines: false,
      responsive: true
    };
    public barChartLegend:boolean = true;

    constructor() {
    }
}
