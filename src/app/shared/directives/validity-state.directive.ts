import { Directive, ElementRef, inject, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appValidityState]',
})
export class ValidityStateDirective implements OnChanges {
  @Input() valid: boolean;

  el = inject(ElementRef);
  renderer = inject(Renderer2);

  constructor() {
    this.renderer.addClass(this.el.nativeElement, 'fa');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['valid'].currentValue === true) {
      this.removeInvalidSymbol();
      this.addValidSymbol();
    } else {
      this.removeValidSymbol();
      this.addInvalidSymbol();
    }
  }

  protected addValidSymbol(): void {
    this.renderer.setStyle(this.el.nativeElement, 'color', 'green');
    this.renderer.addClass(this.el.nativeElement, 'fa-thumbs-up');
  }

  protected removeValidSymbol(): void {
    this.renderer.removeClass(this.el.nativeElement, 'fa-thumbs-up');
  }

  protected addInvalidSymbol(): void {
    this.renderer.setStyle(this.el.nativeElement, 'color', 'red');
    this.renderer.addClass(this.el.nativeElement, 'fa-thumbs-down');
  }

  protected removeInvalidSymbol(): void {
    this.renderer.removeClass(this.el.nativeElement, 'fa-thumbs-down');
  }
}
