import { Routes } from "@angular/router";

import { DynamicFormComponent } from "./dynamic-form/dynamic-form.module";

export const appRoutes: Routes = [
  {path: "dyn-forms", component: DynamicFormComponent},
  {path: "", redirectTo: "/dyn-forms", pathMatch: "full"},
];
