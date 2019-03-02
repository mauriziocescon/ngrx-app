import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InstanceDetailPageComponent } from './containers';

import { InstanceDetailGuard } from './services';

export const instanceDetailRoutes: Routes = [
  {
    path: 'instance-detail/:id',
    component: InstanceDetailPageComponent,
    canDeactivate: [InstanceDetailGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(instanceDetailRoutes),
  ],
  exports: [
    RouterModule,
  ],
})
export class InstanceDetailRoutingModule {
}
