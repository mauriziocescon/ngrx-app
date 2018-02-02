import { Routes } from "@angular/router";

import { ListContainerComponent } from "./dynamic-form/dynamic-form.module";
import { RulesResolve } from "./rules.resolve";

export const appRoutes: Routes = [
  {
    path: "dyn-forms/:module/step/:step",
    component: ListContainerComponent,
    resolve: {
      rules: RulesResolve,
    }
  },
  // {
  //   path: "",
  //   redirectTo: "/dyn-forms",
  //   pathMatch: "full",
  // },
];
