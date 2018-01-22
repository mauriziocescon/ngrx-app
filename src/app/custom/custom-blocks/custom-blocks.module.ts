import { NgModule } from "@angular/core";

import { SharedModule } from "../../shared/shared.module";

import {
  CustomBlockUtilsService,
  TextInputConfirmerService,
  SERVICES,
} from "./services";

import { COMPONENTS } from "./components";
import {
  CONTAINERS,
  TextInputConfirmerContainerComponent,
} from "./containers";

import { BlockUtilsService } from "../../base/dynamic-form/services";

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
    {provide: BlockUtilsService, useClass: CustomBlockUtilsService},
  ],
})
export class CustomBlocksModule {
}

export {
  CustomBlockUtilsService,
  TextInputConfirmerService,
};
