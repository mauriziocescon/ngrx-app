import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { SERVICES } from './services';

@NgModule({
  imports: [
    SharedModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class B3BlocksModule {
}
