# MeteoApp

## 📱 Description

MeteoApp is a modern weather application developed with Ionic and Angular that provides accurate weather information for your current location and cities around the world. With an elegant and user-friendly interface, MeteoApp keeps you informed of current weather conditions, hourly forecasts, and predictions for the coming days.

## ✨ Features

- **Real-time weather information** based on your location
- **Detailed hourly forecast** for the current day
- **Extended forecast** for the upcoming days
- **City search** to check the weather anywhere in the world
- **Favorites** to save your most frequently checked cities
- **Adaptive interface** optimized for mobile devices and tablets
- **Offline mode** showing the latest updated data when there is no connection
- **Multilingual support** with Spanish localization

## 🔧 Technologies

- **Ionic 7**
- **Angular 19**
- **TypeScript**
- **Capacitor**
- **OpenWeatherMap API**
- **SCSS with BEM methodology**
- **Standalone Components**

## 🚀 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- Ionic CLI (`npm install -g @ionic/cli`)

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/OtiliaNicola/meteo-app.git
   cd meteo-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the application in development mode:
   ```bash
   ionic serve
   ```

## 🌐 API

MeteoApp uses the OpenWeatherMap API to obtain accurate weather data. To use the application, you'll need your own API key which you can get by registering at [OpenWeatherMap](https://openweathermap.org/api).

Once you have the API key, place it in the `src/environments/environment.ts` file:

```typescript
export const environment = {
  production: false,
  weatherApiKey: "YOUR_API_KEY_HERE",
  baseUrl: "https://api.openweathermap.org/data/2.5/",
  baseGeoUrl: "https://api.openweathermap.org/geo/1.0/direct"
};
```

## 📋 Project Structure

```
src/
├── app/
│   ├── core/                 # Services, interfaces, and utilities
│   │   ├── interfaces/       # Type definitions
│   │   └── services/         # Services for data and functionalities
│   ├── pages/                # Application pages
│   │   └── tabs/             # Tab system
│   │       └── pages/        # Pages within tabs
│   └── shared/               # Reusable components
├── assets/                   # Images, icons, and static resources
├── environments/             # Environment configurations
└── theme/                    # Global styles and variables
```

## ⚖️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contact

For any inquiries or suggestions, you can contact the developer:

- **Otilia Nicola**
- GitHub: [@OtiliaNicola](https://github.com/OtiliaNicola)

---

<div align="center">
  <sub>Made with ❤️ by Otilia Nicola</sub>
</div>