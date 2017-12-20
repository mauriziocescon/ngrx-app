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

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              protected blockList: BlocksListService) {
  }

  ngAfterViewInit(): void {
    this.loadComponent();
  }

  loadComponent(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.getComponent(this.block));
    const viewContainerRef = this.adComponent.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<BlockComponent>componentRef.instance).block = this.block;
    componentRef.changeDetectorRef.detectChanges();
  }

  getComponent(block: Block): any {
    return this.blockList.getComponent(block);
  }
}
