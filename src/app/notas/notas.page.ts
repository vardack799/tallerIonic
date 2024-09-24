import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NotaService } from '../services/nota.service';
import { Nota } from '../models/Nota';
import { Materia } from '../models/materia';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.page.html',
  styleUrls: ['./notas.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class NotasPage implements OnInit {

  notas: Nota[] = [];
  materias : Materia[] = [];

  constructor(private notaService: NotaService) {}

  ngOnInit() {
    this.notas = this.notaService.getNotas();

  }

}
