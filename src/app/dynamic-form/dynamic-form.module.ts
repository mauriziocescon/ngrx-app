import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";

import { DynamicFormComponent } from "./dynamic-form.component";

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    DynamicFormComponent,
  ],
})
export class DynamicFormModule {
}

export {
  DynamicFormComponent
};
