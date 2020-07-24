import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


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

  getCountry(): Observable<Object> {
    return this.http.get(`${this.url}countries`)
  }

  getLiveByCountry(country:string): Observable<Object> {
    return this.http.get(`${this.url}country/${country}?from=2020-07-01T00:00:00Z&to=2020-07-30T00:00:00Z`)
  }


}
