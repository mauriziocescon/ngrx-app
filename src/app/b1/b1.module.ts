import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { SharedModule } from "../shared/shared.module";

import { COMPONENTS } from "./components";
import {
  CONTAINERS,
  CheckBoxConfirmerContainerComponent,
} from "./containers";

import { EFFECTS } from "./effects";
import { TOKEN, reducerProvider } from "./reducers";
import { SERVICES } from "./services";

@NgModule({
  imports: [
    SharedModule,

    StoreModule.forFeature("b1Blocks", TOKEN),
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
