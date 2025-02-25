import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonInput,
  IonLabel,
  IonTitle,
  IonToolbar,
  ModalController
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-add-city-modal',
  templateUrl: './add-city-modal.page.html',
  styleUrls: ['./add-city-modal.page.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonItem,
    IonInput,
    IonIcon,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
  providers: [ModalController]
})
export class AddCityModalPage {
  cityName: string = '';

  constructor(private modalCtrl: ModalController) {}

  closeModal() {
    this.modalCtrl.dismiss({
      cityName: this.cityName, // Pasamos la ciudad seleccionada
    });
  }

  addCity() {
    if (this.cityName.trim()) {
      this.modalCtrl.dismiss(this.cityName);
    }
  }
}
