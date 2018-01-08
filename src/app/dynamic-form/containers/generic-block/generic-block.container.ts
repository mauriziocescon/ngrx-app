import { Component, ChangeDetectionStrategy, ComponentFactoryResolver, AfterViewInit, ViewChild, Input } from "@angular/core";

import { BlocksListService } from "../../services";

import { AddComponentDirective } from "../../../shared/shared.module";

import { Block, BlockComponent } from "../../models";

@Component({
  selector: "ct-generic-block",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-template add-component></ng-template>`,
})
export class GenericBlockContainerComponent implements AfterViewInit {
  @Input() block: Block;
  @ViewChild(AddComponentDirective) adComponent: AddComponentDirective;

  constructor(protected componentFactoryResolver: ComponentFactoryResolver,
              protected blockList: BlocksListService) {
  }

  ngAfterViewInit(): void {
    this.loadComponent();
  }

  protected loadComponent(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.getComponent(this.block));
    const viewContainerRef = this.adComponent.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<BlockComponent>componentRef.instance).blockId = this.block.id;
    this.blockList.componentBlockInputsIsSet(this.block);
    componentRef.changeDetectorRef.detectChanges();
  }

  protected getComponent(block: Block): any {
    return this.blockList.getComponent(block);
  }
}
