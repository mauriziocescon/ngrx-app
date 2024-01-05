import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'instance-list', loadChildren: () => import('./instance-list/instance-list.routes') },
  { path: 'instance-detail/:id', loadChildren: () => import('./instance-detail/instance-detail.routes') },
  { path: '**', redirectTo: '/instance-list' },
];
