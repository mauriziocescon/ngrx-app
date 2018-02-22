import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { SharedModule } from "../shared/shared.module";

import { EFFECTS } from "./effects";
import * as fromInstanceDetail from "./reducers";
import { TOKEN, reducerProvider } from "./reducers";
import {
  SERVICES,
  InstanceDetailGuard,
  RulesResolve,
  InstanceParamsService,

  BlockListService,

  BlockHooksService,
  BlockUtilsService,

  BlockHooksTriggerService,
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

import { BlockActionsIntegrationService } from "./services/integration/actions.service";

@NgModule({
  imports: [
    SharedModule,

    StoreModule.forFeature("instanceDetail", TOKEN),
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

export * from "./tokens";

export {
  InstanceDetailContainerComponent,

  InstanceDetailGuard,
  RulesResolve,
  InstanceParamsService,

  BlockListService,

  BlockHooksService,
  BlockUtilsService,
  BlockActionsIntegrationService,

  BlockHooksTriggerService,

  CheckBoxActionsService,
  DropdownActionsService,
  TextInputActionsService,
};
