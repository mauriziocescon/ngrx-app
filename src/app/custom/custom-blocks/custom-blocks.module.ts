import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import {
  BlockHooksService,
  BlockRulesService,
  BlockUtilsService,
} from "../../base/dynamic-form/dynamic-form.module";

import { SharedModule } from "../../shared/shared.module";

import { COMPONENTS } from "./components";
import {
  CONTAINERS,
  CheckBoxConfirmerContainerComponent,
} from "./containers";

import { EFFECTS } from "./effects";
import { reducers } from "./reducers";
import {
  SERVICES,
  CustomBlockHooksService,
  CustomBlockRulesService,
  CustomBlockUtilsService,
  CheckBoxConfirmerService,
} from "./services";

@NgModule({
  imports: [
    SharedModule,

    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature("customBlocks", reducers),

    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature([
      ...EFFECTS,
    ]),
  ],
  declarations: [
    ...COMPONENTS,
    ...CONTAINERS,
  ],
  entryComponents: [
    CheckBoxConfirmerContainerComponent,
  ],
  providers: [
    ...SERVICES,
    {provide: BlockHooksService, useClass: CustomBlockHooksService},
    {provide: BlockRulesService, useClass: CustomBlockRulesService},
    {provide: BlockUtilsService, useClass: CustomBlockUtilsService},
  ],
})
export class CustomBlocksModule {
}

export * from "./models";

export {
  CustomBlockHooksService,
  CustomBlockRulesService,
  CustomBlockUtilsService,
  CheckBoxConfirmerService,
};
