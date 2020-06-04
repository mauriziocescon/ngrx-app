import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InstanceDetailContainerComponent } from './containers';

import { InstanceDetailGuard } from './services';

export const instanceDetailRoutes: Routes = [
  {
    path: '',
    component: InstanceDetailContainerComponent,
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
