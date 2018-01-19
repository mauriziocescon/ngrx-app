import { Routes } from "@angular/router";

import { ListContainerComponent } from "./base/dynamic-form/dynamic-form.module";

export const appRoutes: Routes = [
  {path: "ct-list", component: ListContainerComponent},
  {path: "", redirectTo: "/ct-list", pathMatch: "full"},
];
