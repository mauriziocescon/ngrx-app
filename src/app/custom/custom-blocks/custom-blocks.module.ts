import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { BlockUtilsService } from "../../base/dynamic-form/services";

import { SharedModule } from "../../shared/shared.module";

import { EFFECTS } from "./effects";
import { reducers } from "./reducers";
import {
  CustomBlockUtilsService,
  CheckBoxConfirmerService,
  SERVICES,
} from "./services";

import { COMPONENTS } from "./components";
import {
  CONTAINERS,
  CheckBoxConfirmerContainerComponent,
} from "./containers";

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
    {provide: BlockUtilsService, useClass: CustomBlockUtilsService},
  ],
})
export class CustomBlocksModule {
}

export {
  CustomBlockUtilsService,
  CheckBoxConfirmerService,
};
