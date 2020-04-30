import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MaterialInstance, MaterialService} from "../shared/classes/material.service";
import {OrdersService} from "../shared/services/orders.service";
import {Subscription} from "rxjs";
import {Filter, Order} from "../shared/interfases";

const STEP = 2;

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('toolTip', null) tooltipRef: ElementRef;
  tooltip: MaterialInstance;
  oSub: Subscription;
  isFilterVisible = false;
  orders: Order[] = [];
  filter: Filter = {};

  loading = false;
  reloading = false;
  noMoreOrders = false;

  offSet = 0;
  limit = STEP;

  constructor(private ordersService: OrdersService) {
  }

  ngOnInit() {
    this.reloading = true;
    this.fetch();
  }

  private fetch() {

    const params = Object.assign({}, this.filter, {
      offSet: this.offSet,
      limit: this.limit
    });
    this.oSub = this.ordersService.fetch(params).subscribe(orders => {
      this.orders = this.orders.concat(orders);
      this.noMoreOrders = orders.length < STEP;
      this.loading = false;
      this.reloading = false;
    })
    ;
  }

  loadMore() {
    this.offSet += STEP;
    this.loading = true;
    this.fetch();
  }

  ngAfterViewInit() {
   this.tooltip = MaterialService.initTooltip(this.tooltipRef);
  }

  ngOnDestroy() {
    this.tooltip.destroy();
    this.oSub.unsubscribe();
  }

  applyFilter(filter: Filter) {
    this.orders = [];
    this.offSet = 0;
    this.filter = filter;
    this.reloading = true;
    this.fetch();
  }

  isFiltered(): boolean {
    return Object.keys(this.filter).length !== 0;
  }

}
