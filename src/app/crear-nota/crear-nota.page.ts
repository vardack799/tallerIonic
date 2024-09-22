import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { IonicModule} from '@ionic/angular';

@Component({
  selector: 'app-crear-nota',
  templateUrl: './crear-nota.page.html',
  styleUrls: ['./crear-nota.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class CrearNotaPage {
  nota: FormGroup;


  constructor() {
    this.nota = new FormGroup({
      descripcion: new FormControl('', Validators.required),
      nota: new FormControl('',  [
        Validators.required,
        Validators.min(0),
        Validators.max(5),
        Validators.pattern(/^\d+(\.\d{1,2})?$/) // Expresión regular para permitir hasta 2 decimales
      ]),
      observaciones: new FormControl('', Validators.required),
      fechaEntrega: new FormControl(new Date().toISOString(), Validators.required)
    });
  }

  submitNota() {
    // Lógica de envío del formulario aquí
    if (this.nota.valid) {
      // Lógica de envío del formulario aquí
      console.log('Formulario enviado:', this.nota.value);
    } else {
      console.log('Formulario no válido');
    }  }


}
