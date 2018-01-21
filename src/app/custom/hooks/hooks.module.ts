import { NgModule } from "@angular/core";

import { SharedModule } from "../../shared/shared.module";

import { BlocksHooks, BlocksMethods } from "./models"

import { SERVICES, BlockHooksService } from "./services";

@NgModule({
  imports: [
    SharedModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class BlockHooksModule {
}

export {
  BlocksHooks,
  BlocksMethods,
  BlockHooksService,
};
