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
    path: 'main',
    loadComponent: () => import('./main/main.page').then( m => m.MainPage)
  },
  {
    path: 'registro-materia',
    loadComponent: () => import('./registro-materia/registro-materia.page').then( m => m.RegistroMateriaPage)
  },
  {
    path: 'listado-materias',
    loadComponent: () => import('./listado-materias/listado-materias.page').then( m => m.ListadoMateriasPage)
  },
  {
    path: 'mod-materia/:codigo',
    loadComponent: () => import('./mod-materia/mod-materia.page').then( m => m.ModMateriaPage)
  },
  {
    path: 'agregar-nota/:codigoMateria',
    loadComponent: () => import('./agregar-nota/agregar-nota.page').then( m => m.AgregarNotaPage)
  },





];
