import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';

import { EFFECTS } from './effects';
import { TOKEN, reducerProvider } from './reducers';
import { SERVICES } from './services';

import { COMPONENTS, UnknownComponent } from './components';
import {
  CONTAINERS,
  CheckBoxContainerComponent,
  DropdownContainerComponent,
  TextInputContainerComponent,
} from './containers';

@NgModule({
  imports: [
    SharedModule,

    StoreModule.forFeature('blocks', TOKEN),
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
  ],
})
export class BlocksModule {
}
