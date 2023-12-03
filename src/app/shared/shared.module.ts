import { NgModule } from '@angular/core';

import { UI } from './ui';

@NgModule({
  imports: [
    ...UI,
  ],
  exports: [
    ...UI,
  ],
})
export class SharedModule {
}
