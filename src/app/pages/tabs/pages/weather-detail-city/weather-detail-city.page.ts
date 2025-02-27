import { addIcons } from 'ionicons';
import { List } from './../../../../core/interfaces/weather-weekend.interface';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonRow,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { WeatherData } from 'src/app/core/interfaces/weather-data.interface';
import { WeatherHourly } from 'src/app/core/interfaces/weather-hourly.interface';
import { WeatherService } from 'src/app/core/services/weather.service';
import { arrowBack } from 'ionicons/icons';

@Component({
  selector: 'app-weather-detail-city',
  templateUrl: './weather-detail-city.page.html',
  styleUrls: ['./weather-detail-city.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonButtons,
    IonCol,
    IonImg,
    IonRow,
    IonGrid,
    IonCard,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class WeatherDetailCityPage implements OnInit {
  weatherTime?: WeatherData | undefined;
  city: string = '';
  hourlyForecast: WeatherHourly['list'] = [];
  cityName: string = '';
  lat: number | null = null;
  lon: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService,
    private readonly router: Router
  ) {
    addIcons({arrowBack});
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.city = params.get('city') || '';
      console.log('Ciudad recibida:', this.city);

      if (this.city) {
        this.getWeatherDetails();
        this.getCityCoordinates(); // Obtener coordenadas de la ciudad
      } else {
        console.error('Error: No se recibió ninguna ciudad.');
      }
    });
  }
  getCityCoordinates() {
    if (!this.city) return;

    const headers = {
      units: 'metric',
      lang: 'sp',
    };

    // Llamada a la API de geocodificación para obtener las coordenadas
    this.weatherService.getWeatherByCity<any>(this.city, headers).subscribe({
      next: (data) => {
        this.lat = data.coord.lat;
        this.lon = data.coord.lon;

        // Una vez obtenidas las coordenadas, obtenemos el pronóstico por horas
        this.getHourlyForecast();
      },
      error: (error) => {
        console.error('Error obteniendo las coordenadas de la ciudad:', error);
      },
    });
  }
  getWeatherDetails() {
    const headers = {
      units: 'metric',
      lang: 'sp',
    };

    this.weatherService
      .getWeatherByCity<WeatherData>(this.city, headers)
      .subscribe({
        next: (data) => {
          this.weatherTime = data; // Asignamos el clima actual
        },
        error: (error) => {
          console.error('Error obteniendo el clima:', error);
        },
      });
  }
  getHourlyForecast() {
    if (this.lat === null || this.lon === null) {
      console.error(
        'Error: No se proporcionaron las coordenadas correctamente.'
      );
      return;
    }

    const headers = {
      units: 'metric',
      lang: 'sp',
    };

    // Llamada a la API para obtener el pronóstico por horas utilizando las coordenadas
    this.weatherService
      .getWeatherByLatAndLon<WeatherHourly>('forecast', {
        ...headers,
        lat: this.lat,
        lon: this.lon,
      })
      .subscribe({
        next: (data) => {
          this.hourlyForecast = data.list; // Asignamos el pronóstico por horas
        },
        error: (error) => {
          console.error('Error obteniendo pronóstico por horas:', error);
        },
      });
  }

  goBack() {
    
    this.router.navigate(['/tabs/search']); // Puedes ajustar la ruta según tu necesidad
  }

  capitalizeFirstLetter(str: string | null): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}
