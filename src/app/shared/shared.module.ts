import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TranslateModule } from '@ngx-translate/core';

import { COMPONENTS } from './components';
import { CONTAINERS } from './containers';
import { DIRECTIVES } from './directives';

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
