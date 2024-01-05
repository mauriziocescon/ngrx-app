import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
  LOCALE_ID,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

import { AppLanguageService } from './core';

import { routes } from './app.routes';

import { environment } from '../environments/environment';

function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

function createLanguageIdLoader(appLanguageService: AppLanguageService): string {
  return appLanguageService.getLanguageId();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore({ router: routerReducer }),
    provideEffects(),
    provideRouterStore(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      name: 'NgRx Standalone App',
    }),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient],
        },
      }),
    ),
    {
      provide: LOCALE_ID,
      useFactory: (createLanguageIdLoader),
      deps: [AppLanguageService],
    },
    importProvidersFrom(
      LoggerModule.forRoot({
        serverLoggingUrl: environment.logsUrl,
        level: !environment.production ? NgxLoggerLevel.ERROR : NgxLoggerLevel.DEBUG,
        serverLogLevel: NgxLoggerLevel.LOG,
      }),
    ),
  ],
};
