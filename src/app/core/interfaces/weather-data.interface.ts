import { CityWeather } from "./city-weather.interface";
import { HourlyForecast } from "./hourly-forecast.interface";
import { WeatherDetails } from "./weather-details.interface";

export interface WeatherData {
    city: string;
    temperature: number;
    condition: string;
    date: string;
    hourlyForecast: HourlyForecast[], 
    otherCities: CityWeather[];
    details: WeatherDetails;
}
