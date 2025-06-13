import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../environnement/environnement';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { EventSearch } from '../models/event';
import { ResponseThree } from '../models/response';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient , private userService: UserService) {}

  createEvent(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/evenements`, data);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }


  getEventById(id: number): Observable<{ data: EventSearch }> {
    return this.http.get<{ data: EventSearch }>(`${this.apiUrl}/event/id/${id}`);
  }

  getLastEvents(): Observable<ResponseThree<EventSearch>> {
    return this.http.get<ResponseThree<EventSearch>>(`${this.apiUrl}/event/three`);
  }


   getOrganizerEvents(filter: string = 'all', search: string = ''): Observable<any> {
   // const token = this.userService.getToken();
   const token = "1|ixjHKHqQXEQ0MiNmpKwnJBUXQdg8gzswzMyi6AJN66498661"

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    let params = new HttpParams();
    if (search) {
      params = params.set('search', search);
    }

    return this.http.get(`${this.apiUrl}/dashboard/organizer/events/${filter}`, {
      headers,
      params,
    });
  }

  getOrganizerTickets(): Observable<any> {
  const token = this.userService.getToken() || "1|ixjHKHqQXEQ0MiNmpKwnJBUXQdg8gzswzMyi6AJN66498661"; // fallback si tu fais des tests

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });

  return this.http.get(`${this.apiUrl}/dashboard/user/tickets`, {
    headers,
  });
}

}