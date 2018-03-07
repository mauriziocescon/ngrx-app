import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { InstanceListPageComponent } from "./containers";

export const instanceListRoutes: Routes = [
  {
    path: "instance-list",
    component: InstanceListPageComponent,
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
