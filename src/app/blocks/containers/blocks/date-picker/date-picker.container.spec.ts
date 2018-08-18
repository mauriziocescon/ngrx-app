import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoggerModule, NGXLogger, NgxLoggerLevel } from 'ngx-logger';

import { CoreModule } from '../../../../core/core.module';
import { BlockType, SharedModule } from '../../../../shared/shared.module';

import * as fromRoot from '../../../../reducers';
import * as fromBlocks from '../../../reducers';

import { COMPONENTS } from '../../../components';
import { CONTAINERS, DatePickerContainerComponent } from '../../../containers';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

describe('DatePickerContainerComponent', () => {
  let component: DatePickerContainerComponent;
  let fixture: ComponentFixture<DatePickerContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
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
        StoreModule.forFeature('blocks', fromBlocks.TOKEN),
        CoreModule.forRoot(),
        SharedModule,
      ],
      declarations: [
        ...COMPONENTS,
        ...CONTAINERS,
      ],
      providers: [
        TranslateService,
        NGXLogger,
        fromRoot.reducerProvider,
        fromBlocks.reducerProvider,
      ],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        // the usage of overrideModule comes from {@Link https://github.com/angular/angular/issues/10760}
        set: {
          entryComponents: [
            ...CONTAINERS,
          ],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerContainerComponent);
    component = fixture.componentInstance;
    component.block = {
      id: '1',
      type: BlockType.DatePicker,
      order: 1,
      label: '',
      value: '2018-04-29T18:30:04.237Z',
      description: '',
      required: true,
      disabled: false,
      valid: true,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
