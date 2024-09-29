import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,
  IonHeader,
   IonTitle,
    IonToolbar,
    IonItem,
    IonList,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButtons,
    IonMenuButton,
    IonButton,
  } from '@ionic/angular/standalone';
  import { RouterLink} from '@angular/router';
import { Materia } from '../models/materia';
import { AppStorageService } from '../services/app-storage.service';

@Component({
  selector: 'app-listado-materias',
  templateUrl: './listado-materias.page.html',
  styleUrls: ['./listado-materias.page.scss'],
  standalone: true,
  imports: [IonContent,
    IonHeader,
     IonTitle,
      IonToolbar,
      IonItem,
      IonList,
      IonLabel,
      IonCard,
      IonCardHeader,
      IonCardTitle,
      IonCardSubtitle,
      IonCardContent,
      IonButtons,
      IonMenuButton,
      IonButton,
      RouterLink,
       CommonModule, FormsModule]
})
export class ListadoMateriasPage implements OnInit {

  materias: Materia[] = [];

  constructor(private appStorageService: AppStorageService) { }

  async ngOnInit() {
    await this.appStorageService.init();
    this.materias = await this.appStorageService.getMaterias();
  }
  async eliminarMateria(codigo: string) {
    await this.appStorageService.removeMateriaByCodigo(codigo);
    this.materias = await this.appStorageService.getMaterias();
  }
}
