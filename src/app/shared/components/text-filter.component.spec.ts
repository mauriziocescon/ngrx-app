import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoggerTestingModule } from 'ngx-logger/testing';

import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromRoot from '../../reducers';

import { CoreModule } from '../../core';
import { SharedModule } from '../shared.module';

import { TextFilterComponent } from './text-filter.component';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

describe('TextFilterComponent', () => {
  let component: TextFilterComponent;
  let fixture: ComponentFixture<TextFilterComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
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
        SharedModule,
      ],
      providers: [
        TranslateService,
        fromRoot.reducerProvider,
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
