import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';
import { UtilsService } from './../../../../core/services/utils.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
  standalone: true,
  imports: [IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, CommonModule, FormsModule]
})
export class FeedbackPage implements OnInit {
  selectedCondition: string = ''; 
  constructor(
    private readonly utilsService: UtilsService
  ) {
    addIcons({arrowBack});
   }

  ngOnInit() {
  }

  selectCondition(condition:string){
    this.selectedCondition = condition;
  }

  submitFeedback() {
    // Lógica de la tarea
    this.utilsService.presentToastSuccess('Gracias por su colaboración!', 'bottom');
  }
}
