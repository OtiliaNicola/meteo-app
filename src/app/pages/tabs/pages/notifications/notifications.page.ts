import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonCard, IonIcon, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { alertCircleOutline, arrowBack, informationCircleOutline, warningOutline } from 'ionicons/icons';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonCard, IonIcon, CommonModule, FormsModule]
})
export class NotificationsPage implements OnInit {

  constructor() {
    addIcons({
      arrowBack,
      warningOutline,
      informationCircleOutline,
      alertCircleOutline
    })
   }

  ngOnInit() {
  }

}
