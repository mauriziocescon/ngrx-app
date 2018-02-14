import { Routes } from "@angular/router";

import { InstanceListContainerComponent } from "./instance-list/instance-list.module";
import { InstanceDetailContainerComponent, ListGuard, RulesResolve } from "./instance-detail/instance-detail.module";

export const appRoutes: Routes = [
  {
    path: "instance-list",
    component: InstanceListContainerComponent,
  },
  {
    path: "instance-detail/:module/:instance/:step",
    component: InstanceDetailContainerComponent,
    resolve: {
      rules: RulesResolve,
    },
    canDeactivate: [ListGuard],
  },
  {
    path: "dyn-block-list/:module/:instance/:step",
    component: InstanceDetailContainerComponent,
    resolve: {
      rules: RulesResolve,
    },
    canDeactivate: [ListGuard],
  },
  {
    path: "",
    redirectTo: "/instance-list",
    pathMatch: "full",
  },
];
