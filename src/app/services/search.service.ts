import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environnement/environnement';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import  {Response} from '../models/response';
import { Event, EventSearch } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createEvent(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/evenements`, data);
  }

  getEvents(url : string): Observable<Response<EventSearch>> {
    if(url != null ){
      return this.http.get<Response<EventSearch>>(`${url}`);
    }
    return this.http.get<Response<EventSearch>>(`${this.apiUrl}/search`);
  }

}
