import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { SharedModule } from "../../shared/shared.module";

import { COMPONENTS } from "./components";
import {
  CONTAINERS,
  CheckBoxConfirmerContainerComponent,
} from "./containers";

import { EFFECTS } from "./effects";
import * as fromB1 from "./reducers";
import { TOKEN, reducerProvider } from "./reducers";
import {
  SERVICES,
  B1BlocksActionsService,
  B1BlockHooksService,
  B1BlockUtilsService,
  CheckBoxConfirmerActionsService,
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
    StoreModule.forFeature("b1Blocks", TOKEN),

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
    reducerProvider,
    ...SERVICES,
  ],
})
export class B1BlocksModule {
}

export { fromB1 };

export * from "./models";

export {
  B1BlocksActionsService,
  B1BlockHooksService,
  B1BlockUtilsService,
  CheckBoxConfirmerActionsService,
  CheckBoxConfirmerContainerComponent,
};
