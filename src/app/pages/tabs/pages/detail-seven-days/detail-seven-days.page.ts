import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-detail-seven-days',
  templateUrl: './detail-seven-days.page.html',
  styleUrls: ['./detail-seven-days.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DetailSevenDaysPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
