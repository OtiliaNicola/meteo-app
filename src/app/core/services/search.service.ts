import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

    constructor(private httpClient: HttpClient) {}

  getWeatherByCity(city: string, headers?: any): Observable<any> {
    let params = new HttpParams()
      .append('appid', environment.weatherApiKey)
      .append('lang', 'es')
      .append('q', city);  
      if (headers) {
        Object.keys(headers).forEach((key: string) => {
          params = params.append(key, headers[key]);
        });
      }
    return this.httpClient.get<any>(`${environment.baseUrl}weather`, { params });
  }
}
