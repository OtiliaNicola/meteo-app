import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  AlertController,
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
  IonSpinner,
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
  waterOutline, cloudOfflineOutline } from 'ionicons/icons';
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
  imports: [IonSpinner, 
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
    RouterModule
  ],
  providers: [ModalController],
})
export class HomePage implements OnInit {
  weatherTime?: WeatherData;
  forecastData?: WeatherWeekend;
  hourlyForecast?: WeatherHourly;
  weatherData: WeatherData[] = [];
  cities: string[] = [];
  permissionsChecked = false;

  constructor(
    private readonly geolocation: GeolocationService,
    private readonly weatherService: WeatherService,
    private readonly router: Router,
    private readonly modalCtrl: ModalController,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly alertController: AlertController
  ) {
    addIcons({grid,reload,addOutline,cloudOfflineOutline,personOutline,waterOutline,speedometerOutline,partlySunnyOutline,});
  }

  async ngOnInit() {
    // Verificar si ya se han mostrado los permisos anteriormente
    const permissionsAlreadyShown = localStorage.getItem('permissionsShown');
    
    if (!permissionsAlreadyShown) {
      // Solo mostrar la alerta si nunca se ha mostrado
      await this.showPermissionsAlert();
    } else {
      // Si ya se han mostrado los permisos, intentar obtener la ubicación directamente
      this.permissionsChecked = true;
      this.getLocationUser();
    }
    
    const storedCities = localStorage.getItem('cities');
    if (storedCities) {
      this.cities = JSON.parse(storedCities).filter((city: string) => city && city.trim() !== '');
    }
    this.getWeatherForMultipleCities();
  }

  async showPermissionsAlert() {
    const alert = await this.alertController.create({
      header: 'Permisos de ubicación',
      message: 'Esta aplicación necesita acceder a tu ubicación para mostrar información meteorológica precisa de tu zona. Por favor, acepta los permisos cuando se te soliciten.',
      cssClass: 'permissions-alert',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            localStorage.setItem('permissionsShown', 'true');
            this.permissionsChecked = true;
            
            // Empezamos a obtener la ubicación con un timeout por si acaso
            const timeoutPromise = new Promise((_, reject) => {
              setTimeout(() => reject(new Error('Timeout obteniendo ubicación')), 5000);
            });
            
            // Intentamos obtener la ubicación con un timeout de seguridad
            Promise.race([
              this.getLocationUser(),
              timeoutPromise
            ]).catch(error => {
              console.error('Error o timeout al obtener ubicación:', error);
              this.loadDefaultData();
            });
          }
        }
      ]
    }); 
    await alert.present();
  }
  
  async getLocationUser() {
    try {
      const currentLocation = await this.geolocation.printCurrentPosition();
      const { lon, lat } = currentLocation;
      const headers = {
        lon,
        lat,
        units: 'metric',
        lang: 'sp',
      };
  
      this.weatherService
        .getWeatherByLatAndLon<WeatherData>('weather', headers)
        .subscribe({
          next: (data) => {
            data.main.temp = Math.round(data.main.temp);
            data.main.feels_like = Math.round(data.main.feels_like);
            data.main.temp_min = Math.round(data.main.temp_min);
            data.main.temp_max = Math.round(data.main.temp_max);
            this.weatherTime = data;
          },
          error: (error) => {
            console.error('Error obteniendo datos del clima:', error);
            this.loadDefaultData();
          }
        });
  
      this.weatherService
        .getWeatherByLatAndLon<WeatherHourly>('forecast', headers)
        .subscribe({
          next: (data) => {
            data.list = data.list.map((item) => ({
              ...item,
              dt_txt: new Date(item.dt * 1000).toISOString(),
              main: {
                ...item.main,
                temp: Math.round(item.main.temp),
                feels_like: Math.round(item.main.feels_like),
                temp_min: Math.round(item.main.temp_min),
                temp_max: Math.round(item.main.temp_max),
              },
            }));
  
            this.hourlyForecast = data;
          },
          error: (error) => {
            console.error('Error obteniendo pronóstico:', error);
          }
        });
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
      // Cargar datos por defecto (Madrid) si hay error
      this.loadDefaultData();
      throw error; // Re-lanzar error para el Promise.race
    }
  }
  
  async loadDefaultData() {
    const headers = {
      units: 'metric',
      lang: 'sp',
    };
    
    this.weatherService
      .getWeatherByCity<WeatherData>('Madrid', headers)
      .subscribe({
        next: (data) => {
          data.main.temp = Math.round(data.main.temp);
          data.main.feels_like = Math.round(data.main.feels_like);
          data.main.temp_min = Math.round(data.main.temp_min);
          data.main.temp_max = Math.round(data.main.temp_max);
          this.weatherTime = data;
        },
        error: (error) => {
          console.error('Error cargando datos por defecto:', error);
          // Asegurar que weatherTime no sea undefined para evitar problemas de carga
          if (!this.weatherTime) {
            this.weatherTime = {} as WeatherData;
          }
        }
      });
  }
  async openAddCityModal() {
    try {
      const modal = await this.modalCtrl.create({
        component: AddCityModalPage,
        cssClass: 'my-custom-modal', // opcional, para estilos
      });

      await modal.present();

      const result = await modal.onDidDismiss(); // Cambiado a onDidDismiss
      if (result.data) {
        const newCity =  result.data.cityName.trim();
        if (newCity && !this.cities.includes(newCity)) {
          this.cities.push(newCity);
          localStorage.setItem('cities', JSON.stringify(this.cities));
          this.getWeatherForMultipleCities();
          //this.changeDetectorRef.detectChanges();
        }else {
          console.log('La ciudad ya está en la lista o no es válida');
        }
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
    const validCities = this.cities.filter((city: string) => city && city.trim() !== '');
    if (validCities.length === 0) {
      console.log('No hay ciudades válidas para mostrar el clima');
      return;
    }
    if(this.cities.length > 0) {
      // Obtener el clima de todas las ciudades al mismo tiempo
      this.weatherService
        .getWeatherForCities<WeatherData>(this.cities, headers)
        .subscribe(
          (data) => {
            // Aquí puedes hacer cualquier modificación que necesites
            // Ejemplo: redondear las temperaturas
            data.forEach((cityWeather) => {
              cityWeather.main.temp = Math.round(cityWeather.main.temp);
              cityWeather.main.feels_like = Math.round(
                cityWeather.main.feels_like
              );
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
  }

  navigateToSevenDayForecast() {
    this.router.navigate(['/tabs/detail-seven-days'], {
      state: {
        weatherTime: this.weatherTime,
        hourlyForecast: this.hourlyForecast,
      },
    });
  }
}