import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TranslateModule } from '@ngx-translate/core';

import { COMPONENTS } from './components';

import { DIRECTIVES } from './directives';
import {
  AddComponentDirective,
  ScrollToTopDirective,
  BlockValidationDirective,
} from './directives';

import {
  Block,
  BlockType,
  BlockComponent,
} from './models';

import { Enum } from './utilities/enum';
import { KeyValue } from './utilities/keyvalue';
import { RouterStateUrl, CustomRouterStateSerializer } from './utilities/route-util';

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
    ...DIRECTIVES,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    InfiniteScrollModule,
    TranslateModule,
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
})
export class SharedModule {
}

export * from './models';

export {
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
