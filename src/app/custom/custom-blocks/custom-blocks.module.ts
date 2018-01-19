import { NgModule } from "@angular/core";

import { SharedModule } from "../../shared/shared.module";

import { SERVICES, TextInputConfirmerService } from "./services";

import { COMPONENTS } from "./components";
import {
  CONTAINERS,
  TextInputConfirmerContainerComponent,
} from "./containers";

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    ...COMPONENTS,
    ...CONTAINERS,
  ],
  entryComponents: [
    TextInputConfirmerContainerComponent,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class CustomBlocksModule {
}

export {
  TextInputConfirmerService,
};
