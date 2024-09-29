import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenu, IonButton, IonButtons, IonMenuButton, IonCard, IonCardContent, IonInput, IonLabel, IonItem } from '@ionic/angular/standalone';
import { AppStorageService } from '../services/app-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-mod-materia',
  templateUrl: './mod-materia.page.html',
  styleUrls: ['./mod-materia.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonMenu,
    IonButton,
    IonButtons,
    IonMenuButton,
    IonCard,
    IonCardContent,
    IonInput,
    IonLabel,
    IonItem,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ModMateriaPage implements OnInit {

  modMateria!: FormGroup;
  materiaActual: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private appStorageService: AppStorageService,
    private alertController: AlertController,

  ) {}

  async ngOnInit() {
    const codigo = this.route.snapshot.paramMap.get('codigo');
    if (codigo) {
      this.materiaActual = await this.appStorageService.getMateriaByCodigo(codigo);

      if (this.materiaActual) {
        this.modMateria = this.fb.group({
          nombre: [this.materiaActual.nombre, Validators.required],
          semestre: [this.materiaActual.semestre, Validators.required],
          codigo: [this.materiaActual.codigo, Validators.required],
          horario: [this.materiaActual.horario, Validators.required],
          observaciones: [this.materiaActual.observaciones || ''],
        });
      } else {
        this.router.navigate(['/listado-materias']);
      }
    } else {
      this.router.navigate(['/listado-materias']);
    }
  }

  async guardarCambios() {
    if (this.modMateria.valid) {
      const alert = await this.alertController.create({
        header: 'Confirmar cambios',
        message: '¿Estás seguro de que deseas guardar los cambios?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Cancelar');
            }
          }, {
            text: 'Guardar',
            handler: () => {
              location.reload();
              this.appStorageService.updateMateria(this.materiaActual.codigo, this.modMateria.value);
              this.router.navigate(['/listado-materias']);
            }
          }
        ]
      });

      await alert.present();
    }
}
}

