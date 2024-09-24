import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { Materia, Nota } from '../models/materia';
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
      observaciones: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.loadMateriasFromStorage();
  }

  async submitMateria(): Promise<void> {
    if (this.materiaForm.valid) {
      const materiaValue: Materia = {
        ...this.materiaForm.value,
        notas: [] // Inicialmente sin notas
      };

      if (!this.materias.find(m => m.codigo === materiaValue.codigo)) {
        this.materias.push(materiaValue);
        localStorage.setItem('materias', JSON.stringify(this.materias));

        await this.presentAlert('Materia registrada', JSON.stringify(materiaValue));
        this.materiaForm.reset();
        location.reload();
      } else {
        await this.presentAlert('Error', 'La materia ya existe');
      }
    } else {
      await this.presentAlert('Error', 'Formulario no válido');
    }
  }

  async eliminarMateria(codigo: string): Promise<void> {
    const materiaIndex = this.materias.findIndex(m => m.codigo === codigo);

    if (materiaIndex !== -1) {
      const materia = this.materias[materiaIndex];

      // Verificar si la materia tiene notas
      if (materia.notas && materia.notas.length > 0) {
        await this.presentAlert('Error', 'No se puede eliminar esta materia porque tiene notas registradas.');
        return; // Detener la ejecución si hay notas
      }

      // Eliminar la materia del arreglo
      this.materias.splice(materiaIndex, 1);

      // Actualizar el almacenamiento local
      localStorage.setItem('materias', JSON.stringify(this.materias));

      await this.presentAlert('Materia eliminada', `La materia con código ${codigo} ha sido eliminada.`);
    } else {
      await this.presentAlert('Error', 'La materia no existe');
    }
  }

  async presentAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  loadMateriasFromStorage(): void {
    const storedMaterias = localStorage.getItem('materias');
    this.materias = storedMaterias ? JSON.parse(storedMaterias) : [];
  }
}
