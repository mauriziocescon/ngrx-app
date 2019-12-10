import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { APP_BASE_HREF } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LoggerModule, NGXLogger, NgxLoggerLevel } from 'ngx-logger';

import { StoreModule, Store, combineReducers } from '@ngrx/store';
import * as fromRoot from './reducers';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppContainerComponent } from './app.container';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

describe('AppContainerComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        NgbModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient],
          },
        }),
        LoggerModule.forRoot({
          serverLoggingUrl: '',
          level: NgxLoggerLevel.OFF,
          serverLogLevel: NgxLoggerLevel.OFF,
        }),
        StoreModule.forRoot(fromRoot.TOKEN),
        CoreModule.forRoot(),
        SharedModule,
      ],
      declarations: [
        AppContainerComponent,
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        NGXLogger,
        fromRoot.reducerProvider,
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppContainerComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  // it(`should have as title "NgrxApp"`, async(() => {
  //   const fixture = TestBed.createComponent(AppContainerComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual("NgrxApp");
  // }));
});
