import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonRow,
  IonTitle,
  IonToolbar,
  ModalController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addOutline,
  grid,
  partlySunnyOutline,
  personOutline,
  reload,
  speedometerOutline,
  waterOutline,
} from 'ionicons/icons';
import { WeatherData } from 'src/app/core/interfaces/weather-data.interface';
import { WeatherHourly } from 'src/app/core/interfaces/weather-hourly.interface';
import { WeatherWeekend } from 'src/app/core/interfaces/weather-weekend.interface';
import { GeolocationService } from 'src/app/core/services/geolocation.service';
import { WeatherService } from 'src/app/core/services/weather.service';
import { AddCityModalPage } from 'src/app/shared/add-city-modal/add-city-modal.page';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonImg,
    IonCol,
    IonGrid,
    IonRow,
    IonCard,
    IonButton,
    IonButtons,
    IonIcon,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AddCityModalPage
 ],
 providers: [ModalController]
})
export class HomePage implements OnInit {
  weatherTime!: WeatherData;
  forecastData!: WeatherWeekend;
  hourlyForecast!: WeatherHourly;
  weatherData: WeatherData[] = []; 
  cities: string[] = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla'];

  constructor(
    private readonly geolocation: GeolocationService,
    private readonly weatherService: WeatherService,
    private readonly router: Router,
    private readonly modalCtrl: ModalController
  ) {
    addIcons({
      grid,
      reload,
      personOutline,
      waterOutline,
      speedometerOutline,
      partlySunnyOutline,
      addOutline,
    });
  }

  ngOnInit() {
    this.getLocationUser();
    this.getWeatherForMultipleCities();
  }

  async getLocationUser() {
    const currentLocation = await this.geolocation.printCurrentPosition();
    const { lon, lat } = currentLocation;
    const headers = {
      lon,
      lat,
      units: 'metric',
      lang: 'sp',
      cnt: '7',
    };

    this.weatherService
      .getWeatherByLatAndLon<WeatherData>('weather', headers)
      .subscribe((data) => {
        data.main.temp = Math.round(data.main.temp);
        data.main.feels_like = Math.round(data.main.feels_like);
        data.main.temp_min = Math.round(data.main.temp_min);
        data.main.temp_max = Math.round(data.main.temp_max);       
        this.weatherTime = data;
      });

    this.weatherService
      .getWeatherByLatAndLon<WeatherHourly>('forecast', headers)
      .subscribe((data) => {
        data.list = data.list.map((item) => ({
          ...item,
          dt_txt: new Date(item.dt * 1000).toISOString(), // Redondea la hora
          main: {
            ...item.main,
            temp: Math.round(item.main.temp),
            feels_like: Math.round(item.main.feels_like),
            temp_min: Math.round(item.main.temp_min),
            temp_max: Math.round(item.main.temp_max),
          },
        }));
    
        this.hourlyForecast = data;
      });
  }

  async openAddCityModal() {    
    try {
      const modal = await this.modalCtrl.create({
        component: AddCityModalPage,
        cssClass: 'my-custom-modal' // opcional, para estilos
      });
  
      await modal.present();
  
      const result = await modal.onDidDismiss(); // Cambiado a onDidDismiss
      console.log('Modal result:', result); // Para debug
  
      if (result.data) {
        this.cities.push(result.data);
        await this.getWeatherForMultipleCities();
      }
    } catch (error) {
      console.error('Error en el modal:', error);
    }
  }

  getWeatherForMultipleCities() {
    
    const headers = {
      units: 'metric',
      lang: 'sp',
    };

    // Obtener el clima de todas las ciudades al mismo tiempo
    this.weatherService.getWeatherForCities<WeatherData>(this.cities, headers).subscribe(
      (data) => {
        // Aquí puedes hacer cualquier modificación que necesites
        // Ejemplo: redondear las temperaturas
        data.forEach((cityWeather) => {
          cityWeather.main.temp = Math.round(cityWeather.main.temp);
          cityWeather.main.feels_like = Math.round(cityWeather.main.feels_like);
          cityWeather.main.temp_min = Math.round(cityWeather.main.temp_min);
          cityWeather.main.temp_max = Math.round(cityWeather.main.temp_max);
        });
        this.weatherData = data;
      },
      (error) => {
        console.error('Error al obtener los datos del clima', error);
      }
    );
  }

  navigateToSevenDayForecast() {
    this.router.navigate(['/tabs/detail-seven-days'], {
      state: { forecastData: this.forecastData }
    });
  }
}
