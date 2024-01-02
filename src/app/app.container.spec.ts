import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { APP_BASE_HREF } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule, SwUpdate } from '@angular/service-worker';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LoggerTestingModule } from 'ngx-logger/testing';

import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromRoot from './reducers';

import { CoreModule } from './core';

import { AppContainerComponent } from './app.container';


export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

describe('AppContainerComponent', () => {
  let component: AppContainerComponent;
  let fixture: ComponentFixture<AppContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: false }),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient],
          },
        }),
        LoggerTestingModule,
        StoreModule.forRoot(fromRoot.TOKEN),
        EffectsModule.forRoot(),
        CoreModule,
      ],
      declarations: [
        AppContainerComponent,
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        SwUpdate,
        fromRoot.reducerProvider,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    fixture = TestBed.createComponent(AppContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
