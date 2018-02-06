import { Routes } from "@angular/router";

import { ListContainerComponent } from "./dynamic-blocks-list/dynamic-blocks-list.module";
import { RulesResolve } from "./rules.resolve";

export const appRoutes: Routes = [
  {
    path: "dyn-forms/:module/:instance/:step",
    component: ListContainerComponent,
    resolve: {
      rules: RulesResolve,
    }
  },
  {
    path: "",
    redirectTo: "/dyn-forms/b1/1/1",
    pathMatch: "full",
  },
];
