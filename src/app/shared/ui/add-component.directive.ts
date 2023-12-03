import { Directive, inject, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAddComponent]',
  standalone: true,
})
export class AddComponentDirective {
  viewContainerRef = inject(ViewContainerRef);
}
