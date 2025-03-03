import { Component, HostListener, Renderer2 } from '@angular/core';
import { IonApp, IonRouterOutlet, Platform } from '@ionic/angular/standalone';
import packageInfo from '../../package.json';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    IonApp,
    IonRouterOutlet
  ],
  standalone: true
})
export class AppComponent {
  isDesktop = false;

  constructor(
    private platform: Platform,
    private renderer: Renderer2
  ) {
    this.initializeApp();
    console.log(packageInfo.version);
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.checkScreenSize();
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    const width = window.innerWidth;
    this.isDesktop = width >= 768;
    
    if (this.isDesktop) {
      // Si es desktop, añadir el marco decorativo
      this.addPhoneFrame();
    } else {
      // Si es móvil, eliminar el marco si existe
      this.removePhoneFrame();
    }
  }

  private addPhoneFrame() {
    // Verificar si ya existe el marco
    if (!document.querySelector('.desktop-phone-frame')) {
      const frame = this.renderer.createElement('div');
      this.renderer.addClass(frame, 'desktop-phone-frame');
      this.renderer.appendChild(document.body, frame);
    }
  }

  private removePhoneFrame() {
    const frame = document.querySelector('.desktop-phone-frame');
    if (frame) {
      this.renderer.removeChild(document.body, frame);
    }
  }
}