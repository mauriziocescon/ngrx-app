import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { SharedModule } from "../shared/shared.module";

import { CheckBoxEffect } from "./effects/blocks/check-box.effect";
import { DropdownEffect } from "./effects/blocks/dropdown.effect";
import { TextInputEffect } from "./effects/blocks/text-input.effect";
import { ListEffects } from "./effects/list.effect";
import { reducers } from "./reducers";

import { CheckBoxService } from "./services/blocks/check-box.service";
import { DropdownService } from "./services/blocks/dropdown.service";
import { TextInputService } from "./services/blocks/text-input.service";
import { BlocksListService } from "./services/list.service";

import { COMPONENTS } from "./components";
import {
  CONTAINERS,
  ListContainerComponent,
  CheckBoxContainerComponent,
  DropdownContainerComponent,
  TextInputContainerComponent
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
    StoreModule.forFeature("dynamicForm", reducers),

    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature([
      CheckBoxEffect,
      DropdownEffect,
      TextInputEffect,
      ListEffects,
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
  ],
  providers: [
    CheckBoxService,
    DropdownService,
    TextInputService,
    BlocksListService,
  ],
})
export class DynamicFormModule {
}

export {
  ListContainerComponent,
};
