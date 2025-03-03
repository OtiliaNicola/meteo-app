import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBack,
  arrowBackOutline,
  grid,
  location,
  locationOutline,
  searchCircle,
  searchOutline,
  trash,
} from 'ionicons/icons';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
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
  imports: [
    IonLabel,
    IonList,
    IonItem,
    IonInput,
    IonCard,
    IonIcon,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    CommonModule,
    FormsModule,
  ],
})
export class SearchPage implements OnInit, OnDestroy {
  city: string = '';
  weatherData!: WeatherData;
  cityWeather: SearchHistoryItem[] = [];
  defaultImg: string = 'assets/icons/clima.png';
  citySuggestions: WeatherCity[] = [];

  private searchTerms = new Subject<string>();
  private destroy$ = new Subject<void>();

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
      trash,
    });

    // Configurar la búsqueda reactiva con debounce
    this.searchTerms
      .pipe(takeUntil(this.destroy$), debounceTime(300), distinctUntilChanged())
      .subscribe((term) => {
        this.performSearch(term);
      });
  }

  async ngOnInit() {
    try {
      const storedHistory = await this.storageService.get<SearchHistoryItem[]>(
        'searchHistory'
      );
      // Verificamos que sea un array y tiene elementos
      this.cityWeather = Array.isArray(storedHistory) ? storedHistory : [];
    } catch (error) {
      console.error('Error al cargar el historial de búsqueda:', error);
      this.cityWeather = [];
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  searchCitySuggestions() {
    if (this.city && this.city.trim()) {
      this.searchTerms.next(this.city.trim());
    } else {
      this.citySuggestions = [];
    }
  }

  private performSearch(term: string) {
    if (term.length < 2) {
      this.citySuggestions = [];
      return;
    }

    // Llamamos al servicio para obtener las sugerencias de ciudades
    this.searchService.getCitySuggestions(term).subscribe({
      next: (data) => {
        console.log('Sugerencias recibidas:', data);
        this.citySuggestions = data.slice(0, 5); // Limitamos a 5 sugerencias
      },
      error: (err) => {
        console.error('Error obteniendo sugerencias de ciudad:', err);
        this.citySuggestions = [];
      },
    });
  }

  // Función que maneja la selección de una ciudad de las sugerencias
  selectCity(item: WeatherCity) {
    this.city = item.name;
    this.searchCity();
    this.citySuggestions = [];
  }

  async searchCity() {
    if (!this.city.trim()) return;

    const headers = {
      units: 'metric', // Unidades en grados Celsius
      lang: 'sp', // Idioma de la respuesta (español)
    };

    this.searchService.getWeatherByCity(this.city, headers).subscribe({
      next: async (data) => {
        if (data) {
          this.weatherData = data;

          try {
            // Recuperamos historial anterior con tipo correcto
            const history =
              (await this.storageService.get<SearchHistoryItem[]>(
                'searchHistory'
              )) || [];
            const historyArray: SearchHistoryItem[] = Array.isArray(history)
              ? history
              : [];

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

  async removeFromHistory(item: SearchHistoryItem) {
    console.log('Toast mostrado');
    
    // Filtrar el elemento del array local
    this.cityWeather = this.cityWeather.filter(
      (city) => city.city.toLowerCase() !== item.city.toLowerCase()
    );
    // Mostrar el toast antes de eliminar para mejorar la experiencia del usuario
    await this.utilsService.presentToastSuccess(`Ciudad "${item.city}" eliminada`);
    
    // Actualizar el almacenamiento local
    await this.storageService.set('searchHistory', this.cityWeather);
  }

  getImage(img: string) {
    return `https://openweathermap.org/img/wn/${img}.png`;
  }

  goToWeatherDetail(city: string) {
    if (city && city.trim()) {
      this.router.navigate(['/tabs/weather-detail-city', city]);
    } else {
      console.error('❌ Error: Ciudad no válida.');
    }
  }
}
