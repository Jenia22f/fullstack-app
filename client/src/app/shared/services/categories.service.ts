import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Category, Message} from "../interfases";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) {
  }

  fetch(): Observable<Category[]> {
   return  this.http.get<Category[]>('/api/category')
  }

  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`/api/category/${id}`)
  }

  create(name: string, image?: File): Observable<Category> {
    const fd = new FormData();

    if (image) {
      fd.append('image', image, image.name)
    }
      fd.append('name', name);

    return this.http.post<Category>('/api/category', fd)
  }

  update(id: string, name: string, image?: File): Observable<Category> {
    const fd = new FormData();

    if (image) {
      fd.append('image', image, image.name)
    }
      fd.append('name', name);

    return this.http.patch<Category>(`/api/category/${id}`, fd)
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/category/${id}`)
  }

  getCovid(): Observable<any> {
    return this.http.get('https://api.covid19api.com/country/south-africa/status/confirmed/live?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z')
  }

}
