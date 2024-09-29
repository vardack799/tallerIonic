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
    IonInput,
    IonSelectOption,
    IonSelect,
    AlertController,
  } from '@ionic/angular/standalone';
  import {   RouterLink} from '@angular/router';
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


  constructor(private appStorageService: AppStorageService,
    private  alertController: AlertController,
     ) { }


  async ngOnInit() {
    await this.appStorageService.init();
    this.materias = await this.appStorageService.getMaterias();


  }
  async eliminarMateria(codigo: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de eliminar la materia con código ${codigo}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelar eliminación');
          }
        }, {
          text: 'Eliminar',
          handler: async () => {
            this.appStorageService.removeMateriaByCodigo(codigo);
            this.materias = await this.appStorageService.getMaterias();
            location.reload();
          }
        }
      ]
    });

    await alert.present();

  }

}
