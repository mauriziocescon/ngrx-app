import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

import { StoreModule, provideStore } from '@ngrx/store';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { StoreRouterConnectingModule, provideRouterStore } from '@ngrx/router-store';
import { StoreDevtoolsModule, provideStoreDevtools } from '@ngrx/store-devtools';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

import { TOKEN, reducerProvider, metaReducers } from './reducers';
import { CustomRouterStateSerializer } from './reducers/route-util';

import { CoreModule, AppLanguageService } from './core';
import { SharedModule } from './shared';

import { AppContainerComponent } from './app.container';

import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

function createLanguageIdLoader(appLanguage: AppLanguageService): string {
  return appLanguage.getLanguageId();
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),

    StoreModule.forRoot(TOKEN, { metaReducers }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    StoreDevtoolsModule.instrument({ name: 'NgRx-App DevTools', logOnly: environment.production }),

    NgbModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      },
    }),
    LoggerModule.forRoot({
      serverLoggingUrl: environment.logsUrl,
      level: !environment.production ? NgxLoggerLevel.ERROR : NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.LOG,
    }),
    CoreModule,
    SharedModule,
    AppRoutingModule,
  ],
  declarations: [
    AppContainerComponent,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useFactory: (createLanguageIdLoader),
      deps: [AppLanguageService],
    },
    reducerProvider,
    provideStore(TOKEN, { metaReducers }),
    provideEffects(),
    provideRouterStore({ stateKey: 'router', serializer: CustomRouterStateSerializer }),
    provideStoreDevtools({ name: 'NgRx-App DevTools', logOnly: environment.production }),
  ],
  bootstrap: [
    AppContainerComponent,
  ],
})
export class AppModule {
}
