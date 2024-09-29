import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule, FormControl  } from '@angular/forms';
import { IonContent,
  IonHeader,
  IonTitle,
  IonButton,
  IonLabel,
  IonItem,
  IonInput,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCard,
  IonCardContent,
  IonSelectOption,
  IonSelect,
  IonDatetimeButton,
  IonModal,
  AlertController,
  IonToolbar } from '@ionic/angular/standalone';
import { AppStorageService } from '../services/app-storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-agregar-nota',
  templateUrl: './agregar-nota.page.html',
  styleUrls: ['./agregar-nota.page.scss'],
  standalone: true,
  imports: [IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonLabel,
    IonItem,
    IonInput,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCard,
    IonCardContent,
    IonSelectOption,
    IonSelect,
    IonDatetimeButton,
    IonModal,
    CommonModule, FormsModule, ReactiveFormsModule]
})
export class AgregarNotaPage implements OnInit {

  agregarNota!: FormGroup;
  materiaActual: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private appStorageService: AppStorageService,
    private alertController: AlertController,
  ) {}

  async ngOnInit() {
    const codigoMateria = this.route.snapshot.paramMap.get('codigoMateria');
    if (codigoMateria) {
      this.materiaActual = await this.appStorageService.getMateriaByCodigo(codigoMateria);

      if (!this.materiaActual) {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'La materia no fue encontrada',
          buttons: ['OK']
        });
        await alert.present();
        this.router.navigate(['/listado-materias']);
      } else {
        this.agregarNota = this.fb.group({
          descripcion: ['', Validators.required],
        //  fe: ['', Validators.required], // Correctamente configurado
          nota: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
          //ob: [''],
          corte: ['', Validators.required],
        });
      }
    } else {
      this.router.navigate(['/listado-materias']);
    }
  }

  isSubmitting = false;

  async aggNotas() {
    if (this.agregarNota.valid) {
      this.isSubmitting = true;
      const nota = this.agregarNota.value;
      const corte = nota.corte;
      const alert = await this.alertController.create({
        header: 'Confirmar agregar nota',
        message: '¿Estás seguro de que deseas agregar la nota?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              this.isSubmitting = false;
              console.log('Cancelar');
            }
          }, {
            text: 'Agregar',
            handler: () => {
              this.appStorageService.addNota(this.materiaActual.codigo, nota, corte);
              this.router.navigate(['/listado-notas', this.materiaActual.codigo]);
              this.isSubmitting = false;
            }
          }
        ]
      });

      await alert.present();
    }
  }

  }



