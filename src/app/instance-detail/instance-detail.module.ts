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
  BlockActionsIntegrationService,
} from "./services";

import { COMPONENTS, UnknownComponent } from "./components";
import {
  CONTAINERS,
  InstanceDetailPageComponent,
  CheckBoxContainerComponent,
  DropdownContainerComponent,
  TextInputContainerComponent,
} from "./containers";

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
    InstanceDetailPageComponent,
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
  InstanceDetailPageComponent,

  InstanceDetailGuard,
  RulesResolve,

  BlockActionsIntegrationService,
};
