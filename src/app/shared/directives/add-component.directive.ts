import { Directive, inject, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAddComponent]',
})
export class AddComponentDirective {
  viewContainerRef = inject(ViewContainerRef);
}
