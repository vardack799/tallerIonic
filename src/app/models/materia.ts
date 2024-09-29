import { Nota } from "./nota";

export interface Materia {
  nombre: string;
  semestre: string;
  codigo: string;
  horario: string;
  observaciones: string;
  notas?: {
    [key: string]: Nota[];
    primer20: Nota[];
    segundo20: Nota[];
    tercer20: Nota[];
    cuarentaFinal: Nota[];
  };
}
