import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HttpClient, HttpClientModule } from "@angular/common/http";

import { TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { StoreModule, Store, combineReducers } from "@ngrx/store";
import * as fromRoot from "../../../reducers";
import * as fromDynamicForm from "../../reducers";

import { CoreModule } from "../../../core/core.module";
import { SharedModule } from "../../../shared/shared.module";

import { BlocksListService } from "../../services/list.service";

import { BlockType } from "../../models";
import { COMPONENTS } from "../../components";
import { GenericBlockContainerComponent } from "./generic-block.component";

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
          "dynamicForm": combineReducers(fromDynamicForm.reducers),
        }),
        CoreModule.forRoot(),
        SharedModule,
      ],
      declarations: [
        ...COMPONENTS,
        GenericBlockContainerComponent,
      ],
      providers: [
        TranslateService,
        BlocksListService,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericBlockContainerComponent);
    component = fixture.componentInstance;
    component.block = {id: 1, type: BlockType.CheckBox};
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
