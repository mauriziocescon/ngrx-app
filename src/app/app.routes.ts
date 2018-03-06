import { Routes } from "@angular/router";

import { InstanceListPageComponent } from "./instance-list/instance-list.module";
import { InstanceDetailPageComponent, InstanceDetailGuard, RulesResolve } from "./instance-detail/instance-detail.module";

export const appRoutes: Routes = [
  {
    path: "instance-list",
    component: InstanceListPageComponent,
  },
  {
    path: "instance-detail/:module/:instance/:step",
    component: InstanceDetailPageComponent,
    resolve: {
      rules: RulesResolve,
    },
    canDeactivate: [InstanceDetailGuard],
  },
  {
    path: "",
    redirectTo: "/instance-list",
    pathMatch: "full",
  },
];
