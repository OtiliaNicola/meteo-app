import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  getWeatherByLatAndLon<T>(url: string, header:any): Observable<T>{
    let params = new HttpParams()
    .append('appid', environment.weatherApiKey)
    Object.keys(header).forEach((key: string)=>{
      params = params.append(key, header[key]);
    })
    return this.httpClient.get<T>(environment.baseUrl + url, {params});
  }

  getWeatherByCity<T>(city: string, header: any): Observable<T> {
    if (!city || city.trim() === '') {
      console.error('No se proporcionó un nombre de ciudad válido');
      return new Observable(); // Evitamos enviar una solicitud vacía
    }
    let params = new HttpParams()
      .append('appid', environment.weatherApiKey)
      .append('q', city);  // Parámetro de ciudad
      
    Object.keys(header).forEach((key: string) => {
      params = params.append(key, header[key]);
    });
    return this.httpClient.get<T>(environment.baseUrl + 'weather', { params });
  }

  // Método para obtener el clima de varias ciudades a la vez
  getWeatherForCities<T>(cities: string[], header: any): Observable<T[]> {
    const cityRequests = cities.map((city) =>
      this.getWeatherByCity<T>(city, header)
    );
    return forkJoin(cityRequests);  // Realiza las peticiones a todas las ciudades al mismo tiempo
  }
}
