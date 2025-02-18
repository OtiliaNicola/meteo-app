import { DetailSevenDaysPage } from './pages/tabs/pages/detail-seven-days/detail-seven-days.page';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
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
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      }
    ]
  },
];
