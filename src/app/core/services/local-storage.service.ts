import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  async set(key: string, value: any): Promise<void> {
    await Preferences.set({
      key,
      value: JSON.stringify(value),
    });
  }

  async get<T>(key: string): Promise<T | null> {
    const item = await Preferences.get({ key });
    if (item && item.value) {
      return JSON.parse(item.value as string) as T;
    } else {
      return null;
    }
  }

  async remove(key: string): Promise<void> {
    await Preferences.remove({ key });
  }

  async removeItems(keys: string[]): Promise<void> {
    // Usar Promise.all para esperar que todas las operaciones se completen
    await Promise.all(keys.map(key => this.remove(key)));
  }

  async clear(): Promise<void> {
    await Preferences.clear();
  }
}
