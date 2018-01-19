import { NgModule } from "@angular/core";

import { SharedModule } from "../../shared/shared.module";

import { SERVICES, BlockHooksService } from "./services/index";

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
  BlockHooksService,
};
