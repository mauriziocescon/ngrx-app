import { InstanceDetailPageComponent } from "./instance-detail/instance-detail-page.container";

import { NextStepContainerComponent } from "./instance-detail/next-step/next-step.container"
import { ListContainerComponent } from "./instance-detail/list/list.container";

import { GenericBlockContainerComponent } from "./instance-detail/list/generic-block/generic-block.container";

import { CheckBoxContainerComponent } from "./instance-detail/list/generic-block/blocks/check-box/check-box.container";
import { DropdownContainerComponent } from "./instance-detail/list/generic-block/blocks/dropdown/dropdown.container";
import { TextInputContainerComponent } from "./instance-detail/list/generic-block/blocks/text-input/text-input.container";

export const CONTAINERS = [
  InstanceDetailPageComponent,
  NextStepContainerComponent,
  ListContainerComponent,
  GenericBlockContainerComponent,
  CheckBoxContainerComponent,
  DropdownContainerComponent,
  TextInputContainerComponent,
];

export {
  InstanceDetailPageComponent,
  NextStepContainerComponent,
  ListContainerComponent,
  GenericBlockContainerComponent,
  CheckBoxContainerComponent,
  DropdownContainerComponent,
  TextInputContainerComponent,
};
