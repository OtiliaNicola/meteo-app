import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonRow,
  IonGrid,
  IonImg,
  IonCol,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-detail-seven-days',
  templateUrl: './detail-seven-days.page.html',
  styleUrls: ['./detail-seven-days.page.scss'],
  standalone: true,
  imports: [
    IonCol,
    IonImg,
    IonGrid,
    IonRow,
    IonIcon,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterModule,
  ],
})
export class DetailSevenDaysPage implements OnInit {
  constructor() {
    addIcons({ arrowBack });
  }

  ngOnInit() {}
}
