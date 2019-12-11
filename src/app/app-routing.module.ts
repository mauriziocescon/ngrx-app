import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { environment } from '../environments/environment';

export const appRoutes: Routes = [
  {
    path: 'instance-list',
    loadChildren: () => import('./instance-list/instance-list.module').then(mod => mod.InstanceListModule),
  },
  {
    path: 'instance-detail/:id',
    loadChildren: () => import('./instance-detail/instance-detail.module').then(mod => mod.InstanceDetailModule),
  },
  {
    path: '',
    redirectTo: '/instance-list',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      enableTracing: !environment.production,
      useHash: true,
    }),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {
}
