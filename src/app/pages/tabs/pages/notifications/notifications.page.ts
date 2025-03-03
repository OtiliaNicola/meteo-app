import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  alertCircleOutline,
  arrowBack,
  informationCircleOutline,
  notificationsOutline,
  warningOutline,
} from 'ionicons/icons';
import { Subject, takeUntil } from 'rxjs';
import { GeolocationService } from 'src/app/core/services/geolocation.service';
import { WeatherService } from 'src/app/core/services/weather.service';

interface Notification {
  title: string;
  description: string;
  type: string;
  timestamp: Date;
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonIcon,
    CommonModule,
    FormsModule,
  ],
})
export class NotificationsPage implements OnInit, OnDestroy {
  notifications = signal<Notification[]>([]);
  city = 'Madrid';
  private destroy$ = new Subject<void>();

  constructor(
    private readonly weatherService: WeatherService,
    private readonly geolocationService: GeolocationService
  ) {
    addIcons({
      arrowBack,
      warningOutline,
      informationCircleOutline,
      alertCircleOutline,
      notificationsOutline,
    });
  }

  ngOnInit() {
    this.loadWeatherNotifications();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async loadWeatherNotifications() {
    try {
      const location = await this.geolocationService.printCurrentPosition();
      const params = { units: 'metric', lang: 'es' };

      if (location) {
        this.weatherService.getWeatherByLatAndLon('weather', {
          lat: location.lat,
          lon: location.lon,
          ...params
        })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data: any) => {
            this.notifications.set(this.formatWeatherNotifications(data));
          },
          error: (error) => {
            console.error('Error al obtener datos del clima:', error);
            this.loadDefaultCityData(params);
          }
        });
      } else {
        this.loadDefaultCityData(params);
      }
    } catch (error) {
      console.error('Error al obtener ubicación:', error);
      this.loadDefaultCityData({ units: 'metric', lang: 'es' });
    }
  }

  private loadDefaultCityData(params: any) {
    this.weatherService.getWeatherByCity(this.city, params)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.notifications.set(this.formatWeatherNotifications(data));
        },
        error: (error) => {
          console.error('Error al obtener datos de la ciudad por defecto:', error);
          this.notifications.set([]);
        }
      });
  }

  formatWeatherNotifications(weatherData: any): Notification[] {
    return [
      {
        title: `Clima en ${weatherData.name}`,
        description: `Temperatura: ${Math.round(weatherData.main.temp)}°C, ${weatherData.weather[0].description}`,
        type: this.getWeatherAlertType(weatherData.weather[0].main),
        timestamp: new Date()
      }
    ];
  }

  getWeatherAlertType(weatherCondition: string): string {
    const alertMapping: { [key: string]: string } = {
      Thunderstorm: 'alert',
      Drizzle: 'info',
      Rain: 'warning',
      Snow: 'info',
      Clear: 'info',
      Clouds: 'info'
    };
    return alertMapping[weatherCondition] || 'info';
  }

  getNotificationIcon(notification: any): string {
    switch (notification.type) {
      case 'warning': return 'warning-outline';
      case 'info': return 'information-circle-outline';
      case 'alert': return 'alert-circle-outline';
      default: return 'notifications-outline';
    }
  }
}