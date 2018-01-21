import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HttpClient } from "@angular/common/http";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule, RouterStateSerializer } from "@ngrx/router-store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { LoggerModule, NgxLoggerLevel } from "ngx-logger";

import { appRoutes } from "./app.routes";
import { reducers, metaReducers } from "./reducers";
import { EFFECTS } from "./effects";

import { CoreModule } from "./core/core.module";
import { SharedModule, CustomRouterStateSerializer } from "./shared/shared.module";
import { DynamicFormModule } from "./base/dynamic-form/dynamic-form.module";
import { CustomBlocksModule } from "./custom/custom-blocks/custom-blocks.module";
import { BlockHooksModule } from "./custom/hooks/hooks.module";

import { RulesResolve } from "./rules.resolve";

import { AppContainerComponent } from "./app.container";

import { environment } from "../environments/environment";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),

    /**
     * StoreModule.forRoot is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.forRoot(reducers, {metaReducers}),

    /**
     * @ngrx/router-store keeps router state up-to-date in the store.
     */
    StoreRouterConnectingModule,

    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    !environment.production ? StoreDevtoolsModule.instrument(/*{name: "NgRx-App Store DevTools"}*/) : [],

    /**
     * EffectsModule.forRoot() is imported once in the root module and
     * sets up the effects class to be initialized immediately when the
     * application starts.
     *
     * See: https://github.com/ngrx/platform/blob/master/docs/effects/api.md#forroot
     */
    EffectsModule.forRoot(EFFECTS),

    NgbModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
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
    DynamicFormModule,
    CustomBlocksModule,
    BlockHooksModule,
  ],
  declarations: [
    AppContainerComponent
  ],
  providers: [
    /**
     * The `RouterStateSnapshot` provided by the `Router` is a large complex structure.
     * A custom RouterStateSerializer is used to parse the `RouterStateSnapshot` provided
     * by `@ngrx/router-store` to include only the desired pieces of the snapshot.
     */
    {provide: RouterStateSerializer, useClass: CustomRouterStateSerializer},
    RulesResolve,
  ],
  bootstrap: [
    AppContainerComponent,
  ],
})
export class AppModule {
}
