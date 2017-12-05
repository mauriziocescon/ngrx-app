import { NgModule } from "@angular/core";

import { SharedModule } from "../../shared/shared.module";

import { ComponentsModule } from "../components/components.module";

import { GenericBlockContainerComponent } from "./generic-block/generic-block.component";
import { ListContainerComponent } from "./list/list.container";

import { CheckBoxContainerComponent } from "./blocks/check-box/check-box.container";
import { DropdownContainerComponent } from "./blocks/dropdown/dropdown.container";
import { TextInputContainerComponent } from "./blocks/text-input/text-input.container";

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
  ],
  declarations: [
    GenericBlockContainerComponent,
    CheckBoxContainerComponent,
    DropdownContainerComponent,
    ListContainerComponent,
    TextInputContainerComponent,
  ],
  entryComponents: [
    GenericBlockContainerComponent,
  ],
  exports: [
    GenericBlockContainerComponent,
    CheckBoxContainerComponent,
    DropdownContainerComponent,
    ListContainerComponent,
    TextInputContainerComponent,
  ],
})
export class ContainersModule {
}

export {
  GenericBlockContainerComponent,
  CheckBoxContainerComponent,
  DropdownContainerComponent,
  ListContainerComponent,
  TextInputContainerComponent,
};
