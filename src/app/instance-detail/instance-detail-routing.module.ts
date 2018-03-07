import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { InstanceDetailPageComponent } from "./containers";

import { InstanceDetailGuard, RulesResolve } from "./services";

export const instanceDetailRoutes: Routes = [
  {
    path: "instance-detail/:module/:instance/:step",
    component: InstanceDetailPageComponent,
    resolve: {
      rules: RulesResolve,
    },
    canDeactivate: [InstanceDetailGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(instanceDetailRoutes)
  ],
  exports: [
    RouterModule,
  ],
})
export class InstanceDetailRoutingModule {
}
