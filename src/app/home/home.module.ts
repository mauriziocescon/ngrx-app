import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { SharedModule } from "../shared/shared.module";

import { EFFECTS } from "./effects";
import * as fromHome from "./reducers";
import { SERVICES } from "./services";

import { COMPONENTS } from "./components";
import { CONTAINERS } from "./containers";
import { HomeComponent } from './components/home/home.component';

@NgModule({
  imports: [
    SharedModule,

    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature("home", fromHome.reducers),

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
    HomeComponent,
  ],
  entryComponents: [
  ],
  providers: [
    ...SERVICES,
  ],
})
export class HomeModule {
}

export {
  FetchBlocksComplete,
  HomeActionTypes,
} from "./actions/home.actions";

export { fromHome };

export * from "./models";

export {
};
