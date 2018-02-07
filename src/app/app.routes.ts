import { Routes } from "@angular/router";

import { ListContainerComponent, ListGuard } from "./dynamic-blocks-list/dynamic-blocks-list.module";
import { RulesResolve } from "./rules.resolve";

export const appRoutes: Routes = [
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
    redirectTo: "/dyn-blocks-list/b1/1/1",
    pathMatch: "full",
  },
];
