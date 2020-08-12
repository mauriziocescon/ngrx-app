import { NgModule, Optional, SkipSelf, ModuleWithProviders, LOCALE_ID } from '@angular/core';
import { CurrencyPipe, DatePipe, DecimalPipe, PercentPipe } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import * as languageActions from './store/actions/language.actions';
import * as modalAlertsActions from './store/actions/modal-alert.actions';
import * as modalConfirmersActions from './store/actions/modal-confirmer.actions';

import {
  COMPONENTS,
  ModalAlertComponent,
  ModalConfirmerComponent,
} from './components';

import {
  CONTAINERS,
  NavigationBarContainerComponent,
} from './containers';

import {
  SERVICES,
  AppLanguageService,
} from './services';

export function createLanguageIdLoader(appLanguage: AppLanguageService): string {
  return appLanguage.getLanguageId();
}

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    ...COMPONENTS,
    ...CONTAINERS,
  ],
  entryComponents: [
    ModalAlertComponent,
    ModalConfirmerComponent,
  ],
  exports: [
    NavigationBarContainerComponent,
  ],
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        CurrencyPipe,
        DatePipe,
        DecimalPipe,
        PercentPipe,

        ...SERVICES,
        {
          provide: LOCALE_ID,
          useFactory: (createLanguageIdLoader),
          deps: [AppLanguageService],
        },
      ],
    };
  }
}

export {
  languageActions,
  modalAlertsActions,
  modalConfirmersActions,
};

export * from './models';

export * from './services';
