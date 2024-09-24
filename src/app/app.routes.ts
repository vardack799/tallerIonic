import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'main', loadComponent:  () => import('./main/main.page').then(m => m.MainPage)},
{
    path: '',
    redirectTo:'main',
    pathMatch: 'full'
},
  {
    path: 'crear-materia',
    loadComponent: () => import('./crear-materia/crear-materia.page').then( m => m.CrearMateriaPage)
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
