import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";

import { ComponentsModule } from "./components/components.module";
import { ContainersModule } from "./containers/containers.module";

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
    ContainersModule,
  ],
  declarations: [
  ],
})
export class DynamicFormModule {
}
