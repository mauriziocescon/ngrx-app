import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InstanceListContainerComponent } from './ui/instance-list.container';

export const instanceListRoutes: Routes = [
  {
    path: '',
    component: InstanceListContainerComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(instanceListRoutes),
  ],
  exports: [
    RouterModule,
  ],
})
export class InstanceListRoutingModule {
}
