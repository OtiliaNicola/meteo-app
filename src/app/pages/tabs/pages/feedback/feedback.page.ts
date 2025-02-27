import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';
import { UtilsService } from './../../../../core/services/utils.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    CommonModule,
    FormsModule,
  ],
})
export class FeedbackPage implements OnInit {
  selectedCondition: string = '';
  constructor(private readonly utilsService: UtilsService) {
    addIcons({ arrowBack });
  }

  ngOnInit() {}

  selectCondition(condition: string) {
    this.selectedCondition = condition;
  }

  submitFeedback() {
    // Lógica de la tarea
    this.utilsService.presentToastSuccess(
      'Gracias por su colaboración!',
      'bottom'
    );
  }
}
