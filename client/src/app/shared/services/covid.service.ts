import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Country } from "../interfases";


@Injectable({
  providedIn: 'root'
})
export class CovidService {

   url:string = `https://api.covid19api.com/`;

  constructor(private http: HttpClient) {
  }

  getTotalInfo():Observable<Object> {
    return this.http.get(`${this.url}summary`)
  }


  // getCovidData(): Observable<any> {
  //   // return this.http.get('https://api.covid19api.com/country/south-africa/status/confirmed/live?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z')
  //   return this.http.get(`${this.url}country/Poland/status/confirmed/live?from=2020-07-21T00:00:00Z&to=2020-07-24T00:00:00Z`)
  // }

  getCountry(): Observable<Object> {
    return this.http.get(`${this.url}countries`)
  }


}
