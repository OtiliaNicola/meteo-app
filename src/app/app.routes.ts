import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs/tabs.page').then((m) => m.TabsPage),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/tabs/pages/home/home.page').then( m => m.HomePage)
      },
      {
        path: 'search',
        loadComponent: () => import('./pages/tabs/pages/search/search.page').then(m => m.SearchPage)
      },
      {
        path: 'detail-seven-days',
        loadComponent: () => import('./pages/tabs/pages/detail-seven-days/detail-seven-days.page').then( m => m.DetailSevenDaysPage)
      },
      {
        path: 'feedback',
        loadComponent: () => import('./pages/tabs/pages/feedback/feedback.page').then(m => m.FeedbackPage)
      },
      {
        path: 'notifications',
        loadComponent: () => import('./pages/tabs/pages/notifications/notifications.page').then( m => m.NotificationsPage)
      },
    ]
  },
  {
    path: 'weather-detail-city/:city',
    loadComponent: () => import('./pages/tabs/pages/weather-detail-city/weather-detail-city.page').then( m => m.WeatherDetailCityPage)
  },

  // {
  //   path: 'add-city-modal',
  //   loadComponent: () => import('./shared/add-city-modal/add-city-modal.page').then( m => m.AddCityModalPage)
  // },

];
