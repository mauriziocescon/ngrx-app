import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import {
  BlockListService,
  BlockHooksService,
  BlockUtilsService,
} from "../dynamic-form/dynamic-form.module";

import { SharedModule } from "../shared/shared.module";

import { COMPONENTS } from "./components";
import {
  CONTAINERS,
} from "./containers";

import { EFFECTS } from "./effects";
import { TOKEN, reducerProvider } from "./reducers";
import {
  SERVICES,
  CustomBlockListService,
  CustomBlockHooksService,
  CustomBlockUtilsService,
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
    StoreModule.forFeature("customBlocks", TOKEN),

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
  ],
  providers: [
    reducerProvider,
    ...SERVICES,
    {provide: BlockListService, useClass: CustomBlockListService},
    {provide: BlockHooksService, useClass: CustomBlockHooksService},
    {provide: BlockUtilsService, useClass: CustomBlockUtilsService},
  ],
})
export class CustomBlocksModule {
}

export * from "./models";

export {
  CustomBlockHooksService,
  CustomBlockUtilsService,
};
