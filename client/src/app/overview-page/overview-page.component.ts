import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AnalyticsService} from "../shared/services/analytics.service";
import {Observable} from "rxjs";
import {OverviewPage} from "../shared/interfases";
import {MaterialInstance, MaterialService} from "../shared/classes/material.service";

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.css']
})
export class OverviewPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tapTarget', null) tapTargetRef: ElementRef;
  tapTarget: MaterialInstance;
  data$: Observable<OverviewPage>;

  yesterday = new Date();


  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit() {
   this.data$ = this.analyticsService.getOverview()

    this.yesterday.setDate(this.yesterday.getDate() - 1)
  }

  ngOnDestroy() {
    this.tapTarget.destroy();
  }

  ngAfterViewInit() {
    this.tapTarget = MaterialService.initTapTarget(this.tapTargetRef)
  }

  openInfo() {
    this.tapTarget.open();
  }

}
