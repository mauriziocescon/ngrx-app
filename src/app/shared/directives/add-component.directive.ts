import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[app-add-component]',
})
export class AddComponentDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
