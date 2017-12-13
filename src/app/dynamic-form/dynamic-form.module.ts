import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { SharedModule } from "../shared/shared.module";

import { ListEffects } from "./effects/list.effect";
import { reducers } from "./reducers";

import { BlocksListService } from "./services/list.service";

import { COMPONENTS } from "./components/index";
import { CONTAINERS, ListContainerComponent } from "./containers/index";

@NgModule({
  imports: [
    SharedModule,

    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature("dynamicForm", reducers),

    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature([ListEffects]),
  ],
  declarations: [
    ...COMPONENTS,
    ...CONTAINERS,
  ],
  entryComponents: [
    ...COMPONENTS,
  ],
  providers: [
    BlocksListService,
  ],
})
export class DynamicFormModule {
}

export {
  ListContainerComponent,
};
