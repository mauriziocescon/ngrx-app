import { NgModule } from "@angular/core";

import {
  BlockListService,
  BlockHooksService,
  BlockUtilsService,
} from "../dynamic-block-list/dynamic-block-list.module";

import { SharedModule } from "../shared/shared.module";

import {
  SERVICES,
  CustomBlockListService,
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
    {provide: BlockListService, useClass: CustomBlockListService},
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
