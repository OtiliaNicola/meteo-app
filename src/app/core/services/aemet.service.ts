import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AemetNotificationService {

  private apiUrl = 'https://opendata.aemet.es/opendata/api/valores/climatologicos/inventarioestaciones/estaciones/'; // URL de AEMET (debe ser sustituida por la correcta)

  constructor(private readonly httpClient: HttpClient) {}

  getNotifications(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl, {
      headers: {
        'api-key': environment.aemetApiKey 
      }
    });
  }
}
