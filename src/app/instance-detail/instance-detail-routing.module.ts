import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InstanceDetailContainerComponent } from './ui/instance-detail.container';

export const instanceDetailRoutes: Routes = [
  {
    path: '',
    component: InstanceDetailContainerComponent,
    canDeactivate: [(comp: InstanceDetailContainerComponent) => comp?.canDeactivate ?? true],
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
