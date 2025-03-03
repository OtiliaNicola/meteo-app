import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBack, searchOutline, trash } from 'ionicons/icons';
import { UtilsService } from './../../../../core/services/utils.service';
import { App } from '@capacitor/app';

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
  appVersion: string = '';

  constructor(private readonly utilsService: UtilsService) {
    addIcons({ searchOutline, trash, arrowBack });
  }

  async ngOnInit() {
    await this.getAppInfo();
  }

  async getAppInfo() {
    try {
      const info = await App.getInfo();
      this.appVersion = `${info.name} v${info.version}`;
    } catch (error) {
      console.error('Error al obtener información de la app:', error);
      this.appVersion = 'Versión no disponible';
    }
  }

  selectCondition(condition: string) {
    this.selectedCondition = condition;
  }

  submitFeedback() {
    // Lógica de la tarea
    this.utilsService.presentToastSuccess(
      'Gracias por su colaboración!',
      'bottom'
    );
    console.log('Toast mostrado');
  }
}
