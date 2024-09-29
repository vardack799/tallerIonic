import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Materia } from '../models/materia';

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
}
