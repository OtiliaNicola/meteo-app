import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonButton, IonButtons, IonBackButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
  standalone: true,
  imports: [IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, CommonModule, FormsModule]
})
export class FeedbackPage implements OnInit {

  constructor() {
    addIcons({
      arrowBack
    })
   }

  ngOnInit() {
  }

}
