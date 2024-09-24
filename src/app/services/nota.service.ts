import { Injectable } from '@angular/core';
import { Nota } from '../models/Nota';
import { Materia } from '../models/materia';

@Injectable({
  providedIn: 'root'
})
export class NotaService {
  private notas: Nota[] = [];
  private materias: Materia[] = [];

  constructor() {
    this.loadNotasFromStorage();
    this.loadMateriasFromStorage();
  }

  private loadNotasFromStorage() {
    const storedNotas = localStorage.getItem('notas');
    if (storedNotas) {
      this.notas = JSON.parse(storedNotas);
    }
  }

  private loadMateriasFromStorage() {
    const storedMaterias = localStorage.getItem('materias');
    if (storedMaterias) {
      this.materias = JSON.parse(storedMaterias);
    }
  }

  getNotas(): Nota[] {//
    return this.notas;//
  }//

  addNota(nota: Nota) {//
    this.notas.push(nota);///
    localStorage.setItem('notas', JSON.stringify(this.notas));//
  }//

  getMaterias(): Materia[] {
    return this.materias;
  }

  addMateria(materia: Materia) {
    this.materias.push(materia);
  }



}
