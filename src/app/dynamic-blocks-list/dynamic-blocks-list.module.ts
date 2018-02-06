import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { SharedModule } from "../shared/shared.module";

import { EFFECTS } from "./effects";
import * as fromDynamicBlocksList from "./reducers";
import { TOKEN, reducerProvider } from "./reducers";
import {
  SERVICES,
  BlockHooksService,
  BlockListService,
  BlockUtilsService,
  CheckBoxService,
  DropdownService,
  TextInputService,
} from "./services";

import { COMPONENTS, UnknownComponent } from "./components";
import {
  CONTAINERS,
  ListContainerComponent,
  CheckBoxContainerComponent,
  DropdownContainerComponent,
  TextInputContainerComponent,
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
    StoreModule.forFeature("dynamicBlocksList", TOKEN),

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
    CheckBoxContainerComponent,
    DropdownContainerComponent,
    TextInputContainerComponent,
    UnknownComponent,
  ],
  providers: [
    reducerProvider,
    ...SERVICES,
  ],
})
export class DynamicBlocksListModule {
}

export {
  FetchBlocksComplete,
  ListActionTypes,
} from "./actions/list.actions";

export { fromDynamicBlocksList };

export * from "./models";

export {
  ListContainerComponent,
  BlockListService,
  BlockHooksService,
  BlockUtilsService,
  CheckBoxService,
  DropdownService,
  TextInputService,
};
