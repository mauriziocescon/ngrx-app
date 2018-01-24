import { Routes } from "@angular/router";

import { ListContainerComponent } from "./dynamic-form/dynamic-form.module";
import { RulesResolve } from "./rules.resolve";

export const appRoutes: Routes = [
  {
    path: "ct-list",
    component: ListContainerComponent,
    resolve: {
      contact: RulesResolve,
    }
  },
  {
    path: "",
    redirectTo: "/ct-list",
    pathMatch: "full",
  },
];
