import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  constructor() {
    this.requestPermissions();
  }

  async printCurrentPosition(): Promise<{ lat: number; lon: number }> {
    const position = await Geolocation.getCurrentPosition();
    return {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    };
  }

  async requestPermissions() {
    if (Capacitor.isNativePlatform()) {
      return await Geolocation.requestPermissions();
    }
    return false;
  }
}
