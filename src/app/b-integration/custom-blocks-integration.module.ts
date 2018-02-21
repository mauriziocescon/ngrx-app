import { NgModule } from "@angular/core";

import {
  BlocksActionsService,
  BlockHooksService,
  BlockUtilsService,
} from "../instance-detail/instance-detail.module";

import { SharedModule } from "../shared/shared.module";

import {
  SERVICES,
  CustomBlocksActionsService,
  CustomBlockUtilsService,
} from "./services";

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [],
  entryComponents: [],
  providers: [
    ...SERVICES,
    {provide: BlocksActionsService, useClass: CustomBlocksActionsService},
    {provide: BlockUtilsService, useClass: CustomBlockUtilsService},
  ],
})
export class CustomBlocksIntegrationModule {
}

export * from "./models";

export {
  CustomBlockUtilsService,
};
