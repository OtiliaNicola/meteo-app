import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';
import { WeatherHourly } from 'src/app/core/interfaces/weather-hourly.interface';
import { WeatherService } from 'src/app/core/services/weather.service';

@Component({
  selector: 'app-detail-seven-days',
  templateUrl: './detail-seven-days.page.html',
  styleUrls: ['./detail-seven-days.page.scss'],
  standalone: true,
  imports: [
    IonCol,
    IonImg,
    IonGrid,
    IonRow,
    IonIcon,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterModule,
  ],
})
export class DetailSevenDaysPage implements OnInit {
  weatherTime!: WeatherHourly | undefined;
  hourlyForecast: any[] = [];

  constructor(private readonly weatherService: WeatherService) {
    addIcons({ arrowBack });
  }

  ngOnInit() {
    // Primero obtener la ubicación del usuario (si es necesario)
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
  
      const headers = {
        lon: lon,
        lat: lat,
        units: 'metric',
        lang: 'sp',
      };
  
      this.weatherService
        .getWeatherByLatAndLon<WeatherHourly>('forecast', headers)
        .subscribe(
          (data) => {
            if (data && data.list && data.list.length > 0) {
              this.weatherTime = data; //asigno los datos
              // Redondear las temperaturas antes de asignarlas
              data.list.forEach((item) => {
                item.main.temp = Math.round(item.main.temp);
                item.main.temp_max = Math.round(item.main.temp_max);
                item.main.temp_min = Math.round(item.main.temp_min);
              });
  
              // Filtrar los datos a partir de mañana
              const today = new Date();
              // Filtrar para obtener solo los días después de hoy
              const filteredData = data.list.filter((item) => {
                const forecastDate = new Date(item.dt_txt).toISOString().split('T')[0]; // Obtener solo la fecha en formato YYYY-MM-DD
                return forecastDate > today.toISOString().split('T')[0]; // Solo obtener datos a partir de mañana
              });
  
              // Filtrar solo un pronóstico por día (agregamos una verificación por fecha)
              const uniqueDays = new Map();
              const finalForecast = filteredData.filter((item) => {
                const date = item.dt_txt.split(' ')[0]; // Obtener solo la fecha (YYYY-MM-DD)
                if (!uniqueDays.has(date)) {
                  uniqueDays.set(date, true);
                  return true;
                }
                return false; // Ignorar los días repetidos
              });
  
              // Ordenamos los días en orden cronológico
              this.hourlyForecast = finalForecast.sort((a, b) => {
                const dateA = new Date(a.dt_txt).getTime();
                const dateB = new Date(b.dt_txt).getTime();
                return dateA - dateB;
              });
  
              console.log('Datos filtrados por días: ', this.hourlyForecast);
            } else {
              console.error('No hay datos disponibles en la respuesta del clima');
            }
          },
          (error) => {
            console.error('Error al obtener los datos del pronóstico:', error);
          }
        );
    });
  }
  capitalizeFirstLetter(str: string | null): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  isNewDay(date: string, index: number): boolean {
    const currentDay = new Date(date).getDate();
    if (index === 0) {
      // Primer elemento, siempre mostrar
      return true;
    } else {
      const previousDay = new Date(
        this.hourlyForecast[index - 1].dt_txt
      ).getDate();
      return currentDay !== previousDay;
    }
  }
  
}
