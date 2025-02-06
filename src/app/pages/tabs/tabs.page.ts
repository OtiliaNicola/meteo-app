import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  searchOutline,
  personOutline,
  notificationsOutline,
  home,
  search,
  person,
  notifications,
} from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
  ],
})
export class TabsPage {
  constructor() {
    addIcons({
      home,
      'home-outline': homeOutline,
      search,
      'search-outline': searchOutline,
      person,
      'person-outline': personOutline,
      notifications,
      'notifications-outline': notificationsOutline
    });
  }
}
