import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoggerModule, NGXLogger, NgxLoggerLevel } from 'ngx-logger';

import { CoreModule } from '../../../../core/core.module';
import { SharedModule } from '../../../../shared/shared.module';

import { B1BlockType } from '../../../models';
import { CheckBoxConfirmerComponent } from './check-box-confirmer.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

describe('CheckBoxConfirmerComponent', () => {
  let component: CheckBoxConfirmerComponent;
  let fixture: ComponentFixture<CheckBoxConfirmerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient],
          },
        }),
        LoggerModule.forRoot({
          serverLoggingUrl: '',
          level: NgxLoggerLevel.OFF,
          serverLogLevel: NgxLoggerLevel.OFF,
        }),
        CoreModule.forRoot(),
        SharedModule,
      ],
      declarations: [
        CheckBoxConfirmerComponent,
      ],
      providers: [
        TranslateService,
        NGXLogger,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckBoxConfirmerComponent);
    component = fixture.componentInstance;
    component.block = {
      id: '1',
      type: B1BlockType.CheckBoxConfirmer,
      order: 1,
      label: '',
      value: true,
      description: '',
      required: true,
      disabled: false,
      valid: true,
      hooks: {},
    };
    component.loading = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
