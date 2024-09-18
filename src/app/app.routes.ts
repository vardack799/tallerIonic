import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: 'main', loadComponent:  () => import('./main/main.page').then(m => m.MainPage)},
  {
    path: 'materias',
    loadComponent: () => import('./materias/materias.page').then( m => m.MateriasPage)
  },
  {
    path: 'crear-materia',
    loadComponent: () => import('./crear-materia/crear-materia.page').then( m => m.CrearMateriaPage)
  },
  {
    path: 'detalle-materia',
    loadComponent: () => import('./detalle-materia/detalle-materia.page').then( m => m.DetalleMateriaPage)
  },
  {
    path: 'crear-nota',
    loadComponent: () => import('./crear-nota/crear-nota.page').then( m => m.CrearNotaPage)
  },
  {
    path: 'notas',
    loadComponent: () => import('./notas/notas.page').then( m => m.NotasPage)
  },
  


   

];
