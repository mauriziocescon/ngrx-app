import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { SharedModule } from "../../shared/shared.module";

import { COMPONENTS } from "./components";
import {
  CONTAINERS,
  DatePickerContainerComponent,
} from "./containers";

import { EFFECTS } from "./effects";
import * as fromB2 from "./reducers";
import { TOKEN, reducerProvider } from "./reducers";
import {
  SERVICES,
  B2BlockHooksService,
  B2BlockUtilsService,
  DatePickerActionsService,
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
    StoreModule.forFeature("b2Blocks", TOKEN),

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
    DatePickerContainerComponent,
  ],
  providers: [
    reducerProvider,
    ...SERVICES,
  ],
})
export class B2BlocksModule {
}

export * from "./models";

export { fromB2 };

export {
  B2BlockHooksService,
  B2BlockUtilsService,
  DatePickerActionsService,
};
