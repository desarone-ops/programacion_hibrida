import { Routes } from '@angular/router';

export const routes: Routes = [
  // Redirección inicial
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Inicio: cita aleatoria
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage),
  },

  // Gestión: agregar/eliminar
  {
    path: 'manage-quotes',
    loadComponent: () =>
      import('./pages/manage-quotes/manage-quotes.page').then(m => m.ManageQuotesPage),
  },

  // Configuración: toggle persistente
  {
    path: 'settings',
    loadComponent: () =>
      import('./pages/settings/settings.page').then(m => m.SettingsPage),
  },
];
