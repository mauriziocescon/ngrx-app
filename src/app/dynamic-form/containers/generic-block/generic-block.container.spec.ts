import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";

import { HttpClient, HttpClientModule } from "@angular/common/http";

import { TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { StoreModule, Store, combineReducers } from "@ngrx/store";
import * as fromRoot from "../../../reducers";
import * as fromDynamicForm from "../../reducers";

import { CoreModule } from "../../../core/core.module";
import { SharedModule } from "../../../shared/shared.module";
import { BlockHooksModule, BlockHooksService } from "../../../block-hooks/block-hooks.module";

import {
  CheckBoxService,
  DropdownService,
  TextInputService,
  BlocksListService,
} from "../../services";

import { BlockType } from "../../models";
import { COMPONENTS } from "../../components";
import { CONTAINERS, GenericBlockContainerComponent } from "../../containers";

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
        StoreModule.forRoot({
          ...fromRoot.reducers,
          dynamicForm: combineReducers(fromDynamicForm.reducers),
        }),
        CoreModule.forRoot(),
        SharedModule,
        BlockHooksModule,
      ],
      declarations: [
        ...COMPONENTS,
        ...CONTAINERS,
      ],
      providers: [
        TranslateService,
        CheckBoxService,
        DropdownService,
        TextInputService,
        BlocksListService,
        BlockHooksService,
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
