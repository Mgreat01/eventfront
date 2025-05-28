import { HttpClient } from '@angular/common/http';
import { environment } from './../../environnement/environnement';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createEvent(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/evenements`, data);
  }

  
  getCategories(): Observable<any[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }
}
