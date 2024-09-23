export interface Materia {
  nombre: string;
  semestre: string;
  codigo: string;
  horario: string;
  observaciones: string;
  notas: Nota[];
}

export interface Nota {
  descripcion: string;
  nota: number;
  observaciones: string;
  fechaEntrega: string;
}
