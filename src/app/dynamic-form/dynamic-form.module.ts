import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";

import { BlocksListService } from "./services/list.service";

import { ComponentsModule } from "./components/components.module";
import { ContainersModule, ListContainerComponent } from "./containers/containers.module";

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
    ContainersModule,
  ],
  declarations: [
  ],
  providers: [
    BlocksListService,
  ],
})
export class DynamicFormModule {
}

export {
  ListContainerComponent,
};
