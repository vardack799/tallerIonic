export interface Nota {
    id: string;
    fechaEntrega: Date;
    descripcion: string;
    nota: number; 
    observaciones?: string;
    corte: number; 
  }
  
  export interface Materia {
    id: string;
    nombre: string;
    semestre: string;
    codigo: string;
    horario: string;
    observaciones?: string;
    notas: Nota[];
  }
  

