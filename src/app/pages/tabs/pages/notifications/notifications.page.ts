import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  alertCircleOutline,
  arrowBack,
  informationCircleOutline,
  warningOutline,
} from 'ionicons/icons';
import { GeolocationService } from 'src/app/core/services/geolocation.service';
import { WeatherService } from 'src/app/core/services/weather.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonCard,
    IonIcon,
    CommonModule,
    FormsModule,
  ],
})
export class NotificationsPage implements OnInit {
  notifications: any[] = [];
  city = 'Madrid';

  constructor(
    private readonly weatherService: WeatherService,
    private readonly geolocationService: GeolocationService
  ) {
    addIcons({
      arrowBack,
      warningOutline,
      informationCircleOutline,
      alertCircleOutline,
    });
  }

  ngOnInit() {
    this.loadWeatherNotifications();
  }

  async loadWeatherNotifications() {
    const location = await this.geolocationService.printCurrentPosition();
    const params = { units: 'metric', lang: 'es' };

    if (location) {
      this.weatherService.getWeatherByLatAndLon('weather', {
        lat: location.lat,
        lon: location.lon,
        ...params
      }).subscribe((data: any) => {
        this.notifications = this.formatWeatherNotifications(data);
      });
    } else {
      console.warn('No se pudo obtener la ubicación, usando ciudad por defecto');
      this.weatherService.getWeatherByCity('Madrid', params).subscribe((data: any) => {
        this.notifications = this.formatWeatherNotifications(data);
      });
    }
  }

  formatWeatherNotifications(weatherData: any): any[] {
    return [
      {
        title: `Clima en ${weatherData.name}`,
        description: `Temperatura: ${weatherData.main.temp}°C, ${weatherData.weather[0].description}`,
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
