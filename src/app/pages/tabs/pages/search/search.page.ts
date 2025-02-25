import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  cityWeather: any[] = [];
  defaultImg: string = 'assets/icons/clima.png';
  citySuggestions: WeatherCity[] = [];

  constructor(
    private readonly searchService: SearchService,
    private readonly storageService: LocalStorageService,
    private readonly utilsService: UtilsService,
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
    const storedHistory = await this.storageService.get('searchHistory');
    //OPERADOR TERNARIO (estructura de if-else)
    //tiene valor  = verdadero               (ejecuta)       sino asigna array vacío
    this.cityWeather = storedHistory || [];
  }

  async searchCitySuggestions() {
    console.log(555);
    
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
   selectCity(item: any) {
    this.city = item.name; // Asignamos el nombre de la ciudad seleccionada
    this.searchCity(); // Realizamos la búsqueda del clima para esta ciudad
    this.citySuggestions = []; // Limpiamos las sugerencias
  }

  async searchCity() {
    if (this.city.trim()) {
      this.searchService.getWeatherByCity(this.city).subscribe({
        next: async (data) => {
          if (data) {
            this.weatherData = data;

            // Recuperamos historial anterior
            let history = await this.storageService.get('searchHistory');
            history = history ? Object.values(history) : [];

            // Evitar duplicados
            if (
              !history.some(
                (entry: any) => entry.city.toLowerCase() === this.city.toLowerCase()
              )
            ) {
              const newEntry = {
                city: this.city,
                desc: data.weather[0].description,
                iconUrl: data.weather[0].icon
                  ? `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
                  : this.defaultImg,
              };
              history.unshift(newEntry);

              // Guardar el historial actualizado
              await this.storageService.set('searchHistory', history);
         
            }
            this.cityWeather = [...history];

            this.city = '';
          }
        },
        error: (err) => {
          this.utilsService.presentToastDanger('No se encotraron resultados');
          console.error('Error obteniendo el clima:', err);
        },
      });
    }
  }

  getImage(img: string) {
    return `http://openweathermap.org/img/wn/${img}.png`;
  }
}
