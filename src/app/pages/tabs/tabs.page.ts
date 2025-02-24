import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  IonIcon,
  IonTabBar,
  IonTabButton,
  IonTabs, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  home,
  notificationsOutline,
  personOutline,
  searchOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonRouterOutlet, 
    CommonModule,
    FormsModule,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    RouterModule,
  ],
})
export class TabsPage {
  constructor() {
    addIcons({
      home,
      searchOutline,
      personOutline,
      notificationsOutline
    });
  }
}
