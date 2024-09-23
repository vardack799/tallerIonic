import { Injectable } from '@angular/core';
import { Nota } from '../models/Nota';

@Injectable({
  providedIn: 'root'
})
export class NotaService {
  private notas: Nota[] = [];

  constructor() {
    this.loadNotasFromStorage();
  }

  private loadNotasFromStorage() {
    const storedNotas = localStorage.getItem('notas');
    if (storedNotas) {
      this.notas = JSON.parse(storedNotas);
    }
  }

  getNotas(): Nota[] {
    return this.notas;
  }

  addNota(nota: Nota) {
    this.notas.push(nota);
    localStorage.setItem('notas', JSON.stringify(this.notas));
  }
}
