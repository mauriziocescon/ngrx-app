import { Routes } from "@angular/router";

import { HomeContainerComponent } from "./home/home.module";
import { ListContainerComponent, ListGuard } from "./dynamic-block-list/dynamic-block-list.module";
import { RulesResolve } from "./rules.resolve";

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
