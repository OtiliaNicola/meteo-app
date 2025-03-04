import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonLabel,
  IonTitle,
  IonToolbar,
  ModalController,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-add-city-modal',
  templateUrl: './add-city-modal.page.html',
  styleUrls: ['./add-city-modal.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonInput,
    IonLabel,
    FormsModule
  ]
})
export class AddCityModalPage {
  cityName: string = '';

  constructor(
    public modalCtrl: ModalController,
    private toastController: ToastController
  ) {
    addIcons({ closeOutline });
  }

  async addCity() {
    if (this.cityName && this.cityName.trim()) {
      this.modalCtrl.dismiss({
        cityName: this.cityName.trim()
      });
    } else {
      // Mostrar un toast con mensaje de error para el usuario
      const toast = await this.toastController.create({
        message: 'Por favor, introduce un nombre de ciudad válido',
        duration: 2000,
        position: 'bottom',
        color: 'danger'
      });
      await toast.present();
    }
  }
}
