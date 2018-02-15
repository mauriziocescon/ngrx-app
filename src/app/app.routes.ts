import { Routes } from "@angular/router";

import { InstanceListContainerComponent } from "./instance-list/instance-list.module";
import { InstanceDetailContainerComponent, InstanceDetailGuard, RulesResolve } from "./instance-detail/instance-detail.module";

export const appRoutes: Routes = [
  {
    path: "instance-list",
    component: InstanceListContainerComponent,
  },
  {
    path: "instance-detail/:module/:instance/:step",
    component: InstanceDetailContainerComponent,
    resolve: {
      rules: RulesResolve,
    },
    canDeactivate: [InstanceDetailGuard],
  },
  {
    path: "",
    redirectTo: "/instance-list",
    pathMatch: "full",
  },
];
