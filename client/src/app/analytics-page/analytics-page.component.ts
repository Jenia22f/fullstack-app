import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {AnalyticsService} from "../shared/services/analytics.service";
import {AnalyticsPage} from "../shared/interfases";
import {Chart} from 'chart.js'
import {Subscription} from "rxjs";

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.css']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('gain', null) gainRef: ElementRef;
  @ViewChild('order', null) orderRef: ElementRef;

  aSub: Subscription;
  average: number;
  pending = true;

  constructor(private service: AnalyticsService) {
  }

  ngAfterViewInit() {
    const gainConfig: any = {
      label: 'Gain',
      color: 'rgb(255, 99, 132)'
    };

    const orderConfig: any = {
      label: 'Orders',
      color: 'rgb(54, 162, 235)'
    };

    this.aSub = this.service.getAnalytics().subscribe((data: AnalyticsPage) => {
      this.average = data.average;

      gainConfig.labels = data.chart.map(item => item.label);
      gainConfig.data = data.chart.map(item => item.gaine);

      orderConfig.labels = data.chart.map(item => item.label);
      orderConfig.data = data.chart.map(item => item.order);

      // *** исскуственное создание данных чтоб посмотреть  работу графиков gain
      // gainConfig.labels.push('27.04.2020');
      // gainConfig.labels.push('28.04.2020');
      // gainConfig.labels.push('29.04.2020');
      // gainConfig.data.push('80');
      // gainConfig.data.push('50');
      // gainConfig.data.push('100');
      //

      // *** исскуственное создание данных чтоб посмотреть  работу графиков orders
      // orderConfig.labels.push('27.04.2020');
      // orderConfig.labels.push('28.04.2020');
      // orderConfig.labels.push('29.04.2020');
      // orderConfig.data.push('80');
      // orderConfig.data.push('50');
      // orderConfig.data.push('100');
      //

      const gainCtx = this.gainRef.nativeElement.getContext('2d');
      const orderCtx = this.orderRef.nativeElement.getContext('2d');
      gainCtx.canvas.height = '300px';
      orderCtx.canvas.height = '300px';

      new Chart(gainCtx, createChartConfig(gainConfig));

      new Chart(orderCtx, createChartConfig(orderConfig));

      this.pending = false;
    })
  }

  ngOnDestroy() {
    if (this.aSub) this.aSub.unsubscribe();
  }

}

function createChartConfig({labels, data, label, color}) {
  return {
    type: 'line',
    options: {
      responsive: true
    },
    data: {
      labels,
      datasets: [
        {
          label, data,
          borderColor: color,
          steppedLine: false,
          fill: false
        }
      ]
    }
  }
}
