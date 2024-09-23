import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { Materia } from '../models/materia';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-materia',
  templateUrl: './crear-materia.page.html',
  styleUrls: ['./crear-materia.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]

})
export class CrearMateriaPage implements OnInit {
  materiaForm: FormGroup;
  materias: Materia[] = [];

  constructor(private alertController: AlertController) {
    this.materiaForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      semestre: new FormControl('', Validators.required),
      codigo: new FormControl('', Validators.required),
      horario: new FormControl('', Validators.required),
      observaciones: new FormControl('')
    });
  }

  ngOnInit() {
    this.loadMateriasFromStorage();
  }

  async submitMateria() {
    if (this.materiaForm.valid) {
      const materiaValue: Materia = {
        ...this.materiaForm.value,
        notas: [] // Inicialmente sin notas
      };

      this.materias.push(materiaValue);
      localStorage.setItem('materias', JSON.stringify(this.materias));

      await this.presentAlert('Materia registrada', JSON.stringify(materiaValue));
      this.materiaForm.reset();
    } else {
      await this.presentAlert('Error', 'Formulario no válido');
    }
  }

  loadMateriasFromStorage() {
    const storedMaterias = localStorage.getItem('materias');
    this.materias = storedMaterias ? JSON.parse(storedMaterias) : [];
  }

  async eliminarMateria(codigo: string,  nombre: string) {

    const materia = this.materias.find(m => m.codigo === codigo);
    if (materia && materia.notas.length > 0) {
      await this.presentAlert('Error', 'No se puede eliminar esta materia porque tiene notas registradas.');
    } else {
      this.materias = this.materias.filter(m => m.codigo !== codigo);
      this.materias = this.materias.filter(m => m.nombre !== nombre);
      localStorage.setItem('materias', JSON.stringify(this.materias));
      await this.presentAlert('Materia eliminada', `La materia ${nombre} con código ${codigo} ha sido eliminada.`);
    }
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
