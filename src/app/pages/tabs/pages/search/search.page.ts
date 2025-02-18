import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonSearchbar, IonCard, IonInput, IonBackButton } from '@ionic/angular/standalone';
import { arrowBack, searchCircle, grid, location, searchOutline, locationOutline, arrowBackOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonInput, IonButton,IonCard, IonButtons, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, IonInput, CommonModule, FormsModule]
})
export class SearchPage implements OnInit {

  constructor() {
    addIcons({arrowBackOutline,searchOutline,locationOutline,arrowBack,location,grid,searchCircle});
   }

  ngOnInit() {
  }

}
