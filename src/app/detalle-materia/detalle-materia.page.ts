import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Materia } from '../models/materia';

@Component({
  selector: 'app-detalle-materia',
  templateUrl: './detalle-materia.page.html',
  styleUrls: ['./detalle-materia.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DetalleMateriaPage implements OnInit {

  calcularPromedio(materia: Materia): number {
    const totalNotas = materia.notas.reduce((acc, nota) => acc + nota.nota, 0);
    const promedio = totalNotas / materia.notas.length;
    return parseFloat(promedio.toFixed(2));
  }
  
  constructor() { }

  ngOnInit() {
  }

}
