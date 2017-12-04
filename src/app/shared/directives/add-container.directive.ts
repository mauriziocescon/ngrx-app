import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[add-component]",
})
export class AddContainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
