import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonTabButton, IonButtons, IonButton, IonCard, IonRow, IonGrid, IonCol, IonItem, IonImg, IonLabel, IonNote, IonCardContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { grid, reload, personOutline, waterOutline, speedometerOutline, partlySunnyOutline, addOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonImg, IonCol, IonGrid, IonRow, IonCard,IonGrid, IonButton, IonButtons, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HomePage implements OnInit {

  constructor() {
    addIcons({grid,reload,personOutline,waterOutline,speedometerOutline,partlySunnyOutline,addOutline});
   }

  ngOnInit() {
  }

}
