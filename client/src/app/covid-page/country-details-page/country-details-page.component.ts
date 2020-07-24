import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CovidService} from "../../shared/services/covid.service";
import {combineLatest, Observable} from "rxjs";


@Component({
  selector: 'app-country-details-page',
  templateUrl: './country-details-page.component.html',
  styleUrls: ['./country-details-page.component.css']
})
export class CountryDetailsPageComponent implements OnInit {

  country;
  countryLiveData$: Observable<Object>;
  countryName: string;
  confirmed:Number;
  recovered:Number;
  deaths:Number;

  constructor(private covidService: CovidService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.country = params.country);
    this.countryLiveData$ = this.covidService.getLiveByCountry(this.country);
    combineLatest(this.countryLiveData$).subscribe(item =>this.findSum(item))
  }

  findSum(array:Array<any>) {
    var sumConfirmed = 0;
    var sumRecovered = 0;
    var sumdeaths = 0;
    for(var i = 0; i < array[0].length; i++){
      sumConfirmed += array[0][i].Confirmed;
      sumRecovered += array[0][i].Recovered;
      sumdeaths += array[0][i].Deaths;
    }
    this.confirmed = sumConfirmed;
    this.recovered = sumRecovered;
    this.deaths = sumdeaths;
    this.countryName = array[0][0].Country
  }

}
