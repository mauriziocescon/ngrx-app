import { Routes } from "@angular/router";

import { InstanceListContainerComponent } from "./instance-list/instance-list.module";
import { ListContainerComponent, ListGuard, RulesResolve } from "./dynamic-block-list/dynamic-block-list.module";

export const appRoutes: Routes = [
  {
    path: "instance-list",
    component: InstanceListContainerComponent,
  },
  {
    path: "dyn-block-list/:module/:instance/:step",
    component: ListContainerComponent,
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
