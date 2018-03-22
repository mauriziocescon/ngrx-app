import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[add-component]',
})
export class AddComponentDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
