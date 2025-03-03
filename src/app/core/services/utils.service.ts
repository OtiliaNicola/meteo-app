import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  ActionSheetController,
  LoadingController,
  ToastController,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private loading?: HTMLIonLoadingElement;

  constructor(
    private readonly toastController: ToastController,
    private readonly loadingController: LoadingController,
    private readonly router: Router,
    private readonly actionSheetCtrl: ActionSheetController,
  ) { }

  async presentToast(
    text: string,
    position: 'top' | 'middle' | 'bottom' = 'bottom',
    state: string | undefined = undefined,
    duration = 1500
  ): Promise<void> {
    console.log('🟢 Toast de éxito mostrado');
    const toast = await this.toastController.create({
      message: text,
      duration,
      position: position,
      color: state,
    });

    await toast.present();
  }

  async presentToastDanger(
    text: string,
    duration = 7000,
    position: 'top' | 'middle' | 'bottom' = 'bottom'
  ): Promise<void> {
    await this.presentToast(text, position, 'danger', duration);
  }

  async presentToastWarning(
    text: string,
    position: 'top' | 'middle' | 'bottom' = 'bottom'
  ): Promise<void> {
    console.log('🔵 Llamando a presentToastSuccess');
    await this.presentToast(text, position, 'warning');
    console.log('🟢 Toast de éxito mostrado');
  }

  async presentToastInfo(
    text: string,
    position: 'top' | 'middle' | 'bottom' = 'bottom'
  ): Promise<void> {
    await this.presentToast(text, position, 'secondary');
  }

  async presentToastSuccess(
    text: string,
    position: 'top' | 'middle' | 'bottom' = 'bottom'
  ): Promise<void> {
    await this.presentToast(text, position, 'success');
  }

  async presentLoading(): Promise<void> {
    this.loading = await this.loadingController.create({
      spinner: 'bubbles',
    });
    await this.loading.present();
  }

  async hiddenLoading(): Promise<void> {
    if (this.loading) {
      await this.loading.dismiss();
    }
  }

  routerLink(url: string): void {
    this.router.navigateByUrl(url);
  }

  async confirmDelete(header: string): Promise<boolean> {
    const actionSheet = await this.actionSheetCtrl.create({
      header: header,
      buttons: [
        {
          text: 'Sí',
          role: 'destructive',
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    return role === 'destructive';
  }
}

