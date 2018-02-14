import { Routes } from "@angular/router";

import { HomeContainerComponent } from "./instance-list/instance-list.module";
import { ListContainerComponent, ListGuard, RulesResolve } from "./dynamic-block-list/dynamic-block-list.module";

export const appRoutes: Routes = [
  {
    path: "home",
    component: HomeContainerComponent,
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
    redirectTo: "/home",
    pathMatch: "full",
  },
];
