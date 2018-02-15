import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { StoreModule, Store, combineReducers } from "@ngrx/store";
import { HttpClient, HttpClientModule } from "@angular/common/http";

import { TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { LoggerModule, NGXLogger, NgxLoggerLevel } from "ngx-logger";

import { CoreModule } from "../../../../../core/core.module";
import { SharedModule } from "../../../../../shared/shared.module";

import * as fromRoot from "../../../../../reducers";
import * as fromInstanceDetail from "../../../../reducers";

import {
  BlockListService,
  BlockUtilsService,
  CheckBoxService,
  DropdownService,
  TextInputService,
} from "../../../../services";

import { BlockType } from "../../../../models";
import { COMPONENTS } from "../../../../components";
import { CONTAINERS, GenericBlockContainerComponent } from "../../../../containers";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

describe("GenericBlockContainerComponent", () => {
  let component: GenericBlockContainerComponent;
  let fixture: ComponentFixture<GenericBlockContainerComponent>;

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
          serverLoggingUrl: "",
          level: NgxLoggerLevel.OFF,
          serverLogLevel: NgxLoggerLevel.OFF,
        }),
        StoreModule.forRoot(fromRoot.TOKEN),
        StoreModule.forFeature("instanceDetail", fromInstanceDetail.TOKEN),
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
        fromInstanceDetail.reducerProvider,
        BlockListService,
        BlockUtilsService,
        CheckBoxService,
        DropdownService,
        TextInputService,
      ],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        // the usage of overrideModule comes from {@Link https://github.com/angular/angular/issues/10760}
        set: {
          entryComponents: [
            ...CONTAINERS,
          ]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericBlockContainerComponent);
    component = fixture.componentInstance;
    component.block = {
      id: 1,
      type: BlockType.CheckBox,
    };
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
