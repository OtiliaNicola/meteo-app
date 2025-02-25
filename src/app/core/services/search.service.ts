import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WeatherCity } from '../interfaces/weather-city.interface';

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

  getCitySuggestions(query: string): Observable<WeatherCity[]> {
    let params = new HttpParams()
      .set('appid', environment.weatherApiKey)
      .set('lang', 'es')  // Configuramos el idioma como español
      .set('q', query)    // Tomamos el texto que el usuario está escribiendo
      .set('limit', '5'); // Limitar a las primeras 5 sugerencias

    return this.httpClient.get<WeatherCity[]>(`${environment.baseGeoUrl}`, { params });
  }
}
