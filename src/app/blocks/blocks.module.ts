import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';

import { COMPONENTS, UnknownComponent } from './components';
import {
  CONTAINERS,
  CheckBoxContainerComponent,
  CheckBoxConfirmerContainerComponent,
  DatePickerContainerComponent,
  DropdownContainerComponent,
  TextInputContainerComponent,
} from './containers';
import { EFFECTS } from './effects';
import { TOKEN, reducerProvider } from './reducers';
import { SERVICES } from './services';

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
    UnknownComponent,
    ...CONTAINERS,
  ],
  providers: [
    reducerProvider,
    ...SERVICES,
  ],
  exports: [
    ...COMPONENTS,
    ...CONTAINERS,
  ],
})
export class BlocksModule {
}

export {
  UnknownComponent,
  CheckBoxContainerComponent,
  CheckBoxConfirmerContainerComponent,
  DatePickerContainerComponent,
  DropdownContainerComponent,
  TextInputContainerComponent,
};
