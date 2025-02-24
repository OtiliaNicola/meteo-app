export interface WeatherHourly {
    cod: string;
    message: number;
    cnt: number;
    list: WeatherData[];
    city: City;
  }
  
  interface WeatherData {
    dt: number;
    main: MainWeather;
    weather: WeatherCondition[];
    clouds: Clouds;
    wind: Wind;
    visibility: number;
    pop: number;
    rain?: Rain;
    sys: Sys;
    dt_txt: string;
  }
  
  interface MainWeather {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  }
  
  interface WeatherCondition {
    id: number;
    main: string;
    description: string;
    icon: string;
  }
  
  interface Clouds {
    all: number;
  }
  
  interface Wind {
    speed: number;
    deg: number;
    gust: number;
  }
  
  interface Rain {
    "1h": number;
  }
  
  interface Sys {
    pod: string;
  }
  
  interface City {
    id: number;
    name: string;
    coord: Coordinates;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  }
  
  interface Coordinates {
    lat: number;
    lon: number;
  }
  
