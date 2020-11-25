import { Directive, ElementRef, HostListener, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appScrollToTop]',
})
export class ScrollToTopDirective {

  constructor(private el: ElementRef,
              private renderer: Renderer2,
              @Inject(DOCUMENT) private document: Document) {
    this.renderer.setStyle(this.el.nativeElement, 'visibility', 'hidden');
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any): void {
    const scrollTopHeight = this.document.documentElement.scrollTop || 0;
    if (scrollTopHeight > 100) {
      this.renderer.setStyle(this.el.nativeElement, 'visibility', 'visible');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'visibility', 'hidden');
    }
  }

  @HostListener('click', ['$event'])
  scrollToTop(event): void {
    this.document.documentElement.scrollTop = 0;
  }
}
