import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

import { TOKEN, reducerProvider, metaReducers } from './reducers';
import { EFFECTS } from './core/store/effects';

import { CoreModule } from './core/core.module';
import { SharedModule, CustomRouterStateSerializer } from './shared/shared.module';

import { AppContainerComponent } from './app.container';

import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    StoreModule.forRoot(TOKEN, { metaReducers }),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    StoreDevtoolsModule.instrument({ name: 'NgRx-App DevTools', logOnly: environment.production }),
    EffectsModule.forRoot(EFFECTS),

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
    CoreModule.forRoot(),
    SharedModule,
    AppRoutingModule,
  ],
  declarations: [
    AppContainerComponent,
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
    reducerProvider,
  ],
  bootstrap: [
    AppContainerComponent,
  ],
})
export class AppModule {
}
