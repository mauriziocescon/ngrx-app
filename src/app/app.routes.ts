import { Routes } from "@angular/router";

import { ListContainerComponent } from "./dynamic-form/dynamic-form.module";

export const appRoutes: Routes = [
  {path: "ct-list", component: ListContainerComponent},
  {path: "", redirectTo: "/dyn-forms", pathMatch: "full"},
];
