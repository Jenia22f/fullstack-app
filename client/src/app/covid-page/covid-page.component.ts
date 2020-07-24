import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {CovidService} from "../shared/services/covid.service";
import {Total} from "../shared/interfases";

@Component({
  selector: 'app-covid-page',
  templateUrl: './covid-page.component.html',
  styleUrls: ['./covid-page.component.css']
})
export class CovidPageComponent implements OnInit {

  total$: Observable<any>;
  country$: Observable<Object>;
  total:Total;


  constructor(private covidService: CovidService) { }

  ngOnInit() {
    this.total$ = this.covidService.getTotalInfo();
    this.country$ = this.covidService.getCountry();

    this.total$.subscribe(item => this.total = item.Global)
  }


}
