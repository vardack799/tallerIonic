import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule} from '@ionic/angular';

@Component({
  selector: 'app-crear-nota',
  templateUrl: './crear-nota.page.html',
  styleUrls: ['./crear-nota.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CrearNotaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
