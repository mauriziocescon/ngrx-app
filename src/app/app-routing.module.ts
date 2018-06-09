import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { environment } from '../environments/environment';

export const appRoutes: Routes = [
  {
    path: 'instance-list',
    loadChildren: './instance-list/instance-list.module#InstanceListModule',
  },
  {
    path: 'instance-detail/:module/:instance/:step',
    loadChildren: './instance-detail/instance-detail.module#InstanceDetailModule',
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
