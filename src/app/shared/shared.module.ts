import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TranslateModule } from '@ngx-translate/core';

import {
  COMPONENTS,
  TextFilterComponent,
} from './components';

import {
  CONTAINERS,
  GenericBlockContainerComponent,
} from './containers';

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
  IBlockUtils,
  BLOCK_UTILS_TOKEN,
} from './tokens';

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
  TextFilterComponent,

  GenericBlockContainerComponent,

  AddComponentDirective,
  ScrollToTopDirective,
  BlockValidationDirective,

  Block,
  BlockType,
  BlockComponent,

  IBlockUtils,
  BLOCK_UTILS_TOKEN,

  Enum,
  KeyValue,
  RouterStateUrl,
  CustomRouterStateSerializer,
};
