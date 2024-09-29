import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {  RouterLink } from '@angular/router';
import { IonContent,
   IonHeader,
    IonTitle,
     IonToolbar,
     IonButtons,
     IonMenuButton,
     IonCard,
     IonCardContent,
     IonButton,
     IonLabel,
     IonItem,
     IonInput,
     IonText,
     AlertController,
    } from '@ionic/angular/standalone';
import { Materia } from '../models/materia';
import { AppStorageService } from '../services/app-storage.service';

@Component({
  selector: 'app-registro-materia',
  templateUrl: './registro-materia.page.html',
  styleUrls: ['./registro-materia.page.scss'],
  standalone: true,
  imports: [IonContent,
     IonHeader,
      IonTitle,
       IonToolbar,
       IonButtons,
       IonMenuButton,
       IonCard,
       IonCardContent,
       IonButton,
        CommonModule,
        FormsModule,
        IonLabel,
        IonItem,
        IonInput,
        IonText,
        RouterLink,
        ReactiveFormsModule,
        ]
})
export class RegistroMateriaPage implements OnInit {

  materiaForm: FormGroup;
  materias: Materia[] = [];

  constructor(
    private alertController: AlertController,
    private appStorageService: AppStorageService,
  ) {
    this.materiaForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      semestre: new FormControl('', [Validators.required,Validators.min(1),Validators.max(12)]),
      codigo: new FormControl('', Validators.required),
      horario: new FormControl('', Validators.required),
      observaciones: new FormControl(''),
    });
  }

  async ngOnInit() {
    this.loadMaterias();
  }

  async submitMateria() {
    if (this.materiaForm.valid) {
      const nuevaMateria: Materia = this.materiaForm.value;
      await this.appStorageService.addMateria(nuevaMateria);
      this.presentAlert('Registro Exitoso', 'La materia ha sido registrada con éxito.');
      this.materiaForm.reset();
      this.loadMaterias(); // Actualiza la lista de materias 
      this.presentAlert('Error', 'Por favor, completa todos los campos requeridos.');
    }
  }


  async loadMaterias() {
    this.materias = await this.appStorageService.getMaterias();
    console.log(this.materias);
  }

  async presentAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }


}
