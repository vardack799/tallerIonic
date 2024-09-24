import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  private materias: any[] = [];

  constructor() { }

  agregarMateria(materia: any) {
    this.materias.push(materia);
  }

  obtenerMaterias() {
    return this.materias;
  }
}
