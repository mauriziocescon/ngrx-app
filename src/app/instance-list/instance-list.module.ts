import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { SharedModule } from "../shared/shared.module";

import { EFFECTS } from "./effects";
import * as fromInstanceList from "./reducers";
import { SERVICES } from "./services";

import { COMPONENTS } from "./components";
import {
  CONTAINERS,
  InstanceListContainerComponent,
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
    StoreModule.forFeature("instanceList", fromInstanceList.reducers),

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
    ...SERVICES,
  ],
})
export class InstanceListModule {
}

export * from "./models";

export {
  InstanceListContainerComponent,
};
