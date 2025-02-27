import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonButton,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonTitle,
  IonToolbar, IonItem, IonList, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBack,
  arrowBackOutline,
  grid,
  location,
  locationOutline,
  searchCircle,
  searchOutline,
} from 'ionicons/icons';
import { SearchHistoryItem } from 'src/app/core/interfaces/search-history-item.interface';
import { WeatherCity } from 'src/app/core/interfaces/weather-city.interface';
import { WeatherData } from 'src/app/core/interfaces/weather-data.interface';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { SearchService } from 'src/app/core/services/search.service';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonLabel, IonList, IonItem, 
    IonInput,
    IonButton,
    IonCard,
    IonIcon,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonInput,
    CommonModule,
    FormsModule,
  ],
})
export class SearchPage implements OnInit {
  city: string = '';
  weatherData!: WeatherData;
  cityWeather: SearchHistoryItem[] = [];
  defaultImg: string = 'assets/icons/clima.png';
  citySuggestions: WeatherCity[] = [];

  constructor(
    private readonly searchService: SearchService,
    private readonly storageService: LocalStorageService,
    private readonly utilsService: UtilsService,
    private readonly router: Router
  ) {
    addIcons({
      arrowBackOutline,
      searchOutline,
      locationOutline,
      arrowBack,
      location,
      grid,
      searchCircle,
    });
  }

  async ngOnInit() {
    try {
      const storedHistory = await this.storageService.get<SearchHistoryItem[]>('searchHistory');
      // Verificamos que sea un array y tiene elementos
      this.cityWeather = Array.isArray(storedHistory) ? storedHistory : [];
    } catch (error) {
      console.error('Error al cargar el historial de búsqueda:', error);
      this.cityWeather = [];
    }
  }

  async searchCitySuggestions() {
    if (this.city.trim()) {
      // Llamamos al servicio para obtener las sugerencias de ciudades
      this.searchService.getCitySuggestions(this.city).subscribe({
        next: (data) => {
          this.citySuggestions = data; // Asignamos las sugerencias obtenidas
        },
        error: (err) => {
          console.error('Error obteniendo sugerencias de ciudad:', err);
        },
      });
    } else {
      this.citySuggestions = []; // Limpiamos las sugerencias si no hay texto
    }
  }

   // Función que maneja la selección de una ciudad de las sugerencias
   selectCity(item: WeatherCity) {
    this.city = item.name ; // Asignamos el nombre de la ciudad seleccionada
    this.searchCity(); // Realizamos la búsqueda del clima para esta ciudad
    this.citySuggestions = []; // Limpiamos las sugerencias
  }

  async searchCity() {
    if (!this.city.trim()) return;
    
    const headers = {
      units: 'metric',   // Unidades en grados Celsius
      lang: 'sp',        // Idioma de la respuesta (español)
    };
    
    this.searchService.getWeatherByCity(this.city, headers).subscribe({
      next: async (data) => {
        if (data) {
          this.weatherData = data;

          try {
            // Recuperamos historial anterior con tipo correcto
            const history = await this.storageService.get<SearchHistoryItem[]>('searchHistory') || [];
            const historyArray: SearchHistoryItem[] = Array.isArray(history) ? history : [];

            // Evitar duplicados
            const cityLower = this.city.toLowerCase();
            const cityExists = historyArray.some(
              (entry) => entry.city.toLowerCase() === cityLower
            );

            if (!cityExists) {
              const newEntry: SearchHistoryItem = {
                city: this.city,
                desc: data.weather[0].description,
                iconUrl: data.weather[0].icon
                  ? `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
                  : this.defaultImg,
              };
              
              // Añadir al principio del array
              historyArray.unshift(newEntry);

              // Guardar el historial actualizado
              await this.storageService.set('searchHistory', historyArray);
              
              // Actualizar la vista
              this.cityWeather = [...historyArray];
            }

            this.city = '';
          } catch (error) {
            console.error('Error al manejar el historial:', error);
          }
        }
      },
      error: (error) => {
        console.error('Error al buscar ciudad:', error);
        this.utilsService.presentToastDanger('No se encontraron resultados');
      },
    });
  }

  getImage(img: string) {
    return `http://openweathermap.org/img/wn/${img}.png`;
  }

  goToWeatherDetail(city: string) {
    if (city && city.trim()) {
      this.router.navigate(['/weather-detail-city', city]);
    } else {
      console.error('❌ Error: Ciudad no válida.');
    }
  }
}
