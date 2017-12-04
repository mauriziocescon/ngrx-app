import { Component, ComponentFactoryResolver, AfterViewInit, ViewChild } from "@angular/core";

import { AddContainerDirective } from "../../../shared/shared.module";

@Component({
  selector: "app-generic-block",
  templateUrl: "./generic-block.component.html",
  styleUrls: ["./generic-block.component.scss"]
})
export class GenericBlockComponent implements AfterViewInit {
  @ViewChild(AdDirective) adComponent: AddContainerDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngAfterViewInit(): void {
    this.loadComponent();
  }

  loadComponent(): void {
    this.currentAddIndex = (this.currentAddIndex + 1) % this.ads.length;
    let adItem = this.ads[this.currentAddIndex];

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);

    let viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
  }
}
