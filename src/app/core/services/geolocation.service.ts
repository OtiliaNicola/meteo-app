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
    try {
      const position = await Geolocation.getCurrentPosition();
      return {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      };
    } catch (error) {
      console.error('Error getting current location:', error);
      throw error;
    }
  }

  async requestPermissions() {
    try {
      if (Capacitor.isNativePlatform()) {
        return await Geolocation.requestPermissions();
      }
      return false;
    } catch (error) {
      console.error('Error requesting geolocation permissions:', error);
      return false;
    }
  }
}
