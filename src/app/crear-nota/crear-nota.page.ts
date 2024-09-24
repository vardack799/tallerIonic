import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { NotaService } from '../services/nota.service';
import { Nota } from '../models/Nota';
import { Materia } from '../models/materia';

@Component({
  selector: 'app-crear-nota',
  templateUrl: './crear-nota.page.html',
  styleUrls: ['./crear-nota.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class CrearNotaPage implements OnInit {
  notaForm: FormGroup;
  materias: Materia[] = [];

  constructor(private alertController: AlertController, private notaService: NotaService) {
    this.notaForm = new FormGroup({
      materia: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      nota: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(5),
        Validators.pattern(/^\d+(\.\d{1,2})?$/)
      ]),
      observaciones: new FormControl('', Validators.required),
      fechaEntrega: new FormControl(new Date().toISOString(), Validators.required),
    });
  }

  ngOnInit() {
    this.materias = this.notaService.getMaterias();
  }

  async submitNota() {
    if (this.notaForm.valid) {
      const notaValue: Nota = this.notaForm.value;
      this.notaService.addNota(notaValue);
      this.updateMaterias();
      await this.presentAlert('Formulario enviado', JSON.stringify(notaValue));
      this.notaForm.reset();
    } else {
      await this.presentAlert('Error', 'Formulario no válido');
    }
  }

  updateMaterias() {
    this.materias = this.notaService.getMaterias();
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
