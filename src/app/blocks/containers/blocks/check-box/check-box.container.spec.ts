import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoggerModule, NGXLogger, NgxLoggerLevel } from 'ngx-logger';

import { CoreModule } from '../../../../core/core.module';
import { BlockType, SharedModule } from '../../../../shared/shared.module';

import * as fromRoot from '../../../../reducers';
import * as fromBlocks from '../../../reducers';

import { COMPONENTS } from '../../../components';
import { CONTAINERS, CheckBoxContainerComponent } from '../../../containers';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

describe('CheckBoxContainerComponent', () => {
  let component: CheckBoxContainerComponent;
  let fixture: ComponentFixture<CheckBoxContainerComponent>;

  beforeEach(async(() => {
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
    fixture = TestBed.createComponent(CheckBoxContainerComponent);
    component = fixture.componentInstance;
    component.block = {
      id: '1',
      type: BlockType.CheckBox,
      order: 1,
      label: '',
      value: true,
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