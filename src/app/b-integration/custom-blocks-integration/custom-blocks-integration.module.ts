import { NgModule } from "@angular/core";

import {
  BlockHooksService,
  BlockUtilsService,
} from "../../instance-detail/instance-detail.module";

import { SharedModule } from "../../shared/shared.module";

import {
  SERVICES,
  CustomBlockHooksService,
  CustomBlockUtilsService,
} from "./services";

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
  ],
  entryComponents: [
  ],
  providers: [
    ...SERVICES,
    {provide: BlockHooksService, useClass: CustomBlockHooksService},
    {provide: BlockUtilsService, useClass: CustomBlockUtilsService},
  ],
})
export class CustomBlocksIntegrationModule {
}

export * from "./models";

export {
  CustomBlockHooksService,
  CustomBlockUtilsService,
};
