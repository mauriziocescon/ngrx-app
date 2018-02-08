import { Routes } from "@angular/router";

import { HomeContainerComponent } from "./home/home.module";
import { ListContainerComponent, ListGuard } from "./dynamic-blocks-list/dynamic-blocks-list.module";
import { RulesResolve } from "./rules.resolve";

export const appRoutes: Routes = [
  {
    path: "home",
    component: HomeContainerComponent,
  },
  {
    path: "dyn-blocks-list/:module/:instance/:step",
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
