import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TranslateModule } from '@ngx-translate/core';

import { COMPONENTS } from './components';

import { CONTAINERS, GenericBlockContainerComponent } from './containers';

import {
  DIRECTIVES,
  AddComponentDirective,
  ScrollToTopDirective,
  BlockValidationDirective,
} from './directives';

import {
  Block,
  BlockType,
  BlockComponent,
} from './models';

import {
  Enum,
  KeyValue,
  RouterStateUrl,
  CustomRouterStateSerializer,
} from './utilities';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    InfiniteScrollModule,
    TranslateModule,
  ],
  declarations: [
    ...COMPONENTS,
    ...CONTAINERS,
    ...DIRECTIVES,
  ],
  entryComponents: [],
  providers: [],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    InfiniteScrollModule,
    TranslateModule,
    ...COMPONENTS,
    ...CONTAINERS,
    ...DIRECTIVES,
  ],
})
export class SharedModule {
}

export {
  GenericBlockContainerComponent,

  AddComponentDirective,
  ScrollToTopDirective,
  BlockValidationDirective,

  Block,
  BlockType,
  BlockComponent,

  Enum,
  KeyValue,
  RouterStateUrl,
  CustomRouterStateSerializer,
};
