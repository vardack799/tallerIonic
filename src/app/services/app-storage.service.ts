import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Materia } from '../models/materia';
import { Nota } from '../models/nota';

@Injectable({
  providedIn: 'root'
})
export class AppStorageService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async setMaterias(materias: Materia[]) {
    await this._storage?.set('materias', materias);
  }

  async getMaterias(): Promise<Materia[]> {
    const materias = await this._storage?.get('materias');
    return materias || [];
  }

  async addMateria(materia: Materia) {
    const materias = await this.getMaterias();
    materias.push(materia);
    await this.setMaterias(materias);
  }

  async updateMateria(codigo: string, nuevaMateria: Materia): Promise<boolean> {
    const materias = await this.getMaterias();
    const index = materias.findIndex((materia: Materia) => materia.codigo === codigo);
    if (index > -1) {
      materias[index] = nuevaMateria;
      await this.setMaterias(materias);
      return true;
    }
    return false;
  }

  async getMateriaByCodigo(codigo: string): Promise<Materia | null> {
    const materias = await this.getMaterias();
    return materias.find((materia: Materia) => materia.codigo === codigo) || null;
  }
  async removeMateriaByCodigo(codigo: string) {
    let materias = await this.getMaterias();
    materias = materias.filter((materia: Materia) => materia.codigo !== codigo);
    await this.setMaterias(materias);
  }

  async addNota(codigoMateria: string, nota: Nota, corte: string) {
    const materias = await this.getMaterias();
    const materia = materias.find((materia: Materia) => materia.codigo === codigoMateria);
    if (materia) {
      if (!materia.notas) {
        materia.notas = {
          primer20: [],
          segundo20: [],
          tercer20: [],
          cuarentaFinal: [],
        };
      }
      const corteKey = corte as keyof typeof materia.notas;
      materia.notas[corteKey].push(nota);
      await this.setMaterias(materias);
    }
  }

 
}
