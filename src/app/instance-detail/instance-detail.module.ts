import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { SharedModule } from "../shared/shared.module";

import { EFFECTS } from "./effects";
import * as fromInstanceDetail from "./reducers";
import { TOKEN, reducerProvider } from "./reducers";
import {
  SERVICES,
  BlockHooksService,
  BlockListService,
  InstanceDetailGuard,
  RulesResolve,
  BlockUtilsService,
  CheckBoxActionsService,
  DropdownActionsService,
  TextInputActionsService,
} from "./services";

import { COMPONENTS, UnknownComponent } from "./components";
import {
  CONTAINERS,
  InstanceDetailContainerComponent,
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
    StoreModule.forFeature("instanceDetail", TOKEN),

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
  exports: [
    InstanceDetailContainerComponent,
  ],
})
export class InstanceDetailModule {
}

export {
  FetchBlocksComplete,
  ListActionTypes,
} from "./actions/list/list.actions";

export {
  SyncRequired,
  SyncActionTypes,
} from "./actions/list/sync.actions";

export { fromInstanceDetail };

export * from "./models";

export {
  InstanceDetailContainerComponent,
  BlockListService,
  InstanceDetailGuard,
  RulesResolve,
  BlockHooksService,
  BlockUtilsService,
  CheckBoxActionsService,
  DropdownActionsService,
  TextInputActionsService,
};
