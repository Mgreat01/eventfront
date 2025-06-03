import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) {}

   reverseGeocode(lat: number, lng: number): Observable<any> {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
  return this.http.get(url);
}

 
searchPlaces(query: string) {
  return this.http.get<any[]>('https://nominatim.openstreetmap.org/search', {
    params: {
      q: query,
      format: 'json',
      countrycodes: 'cd', 
      limit: '10'
    }
  });
}


 
}