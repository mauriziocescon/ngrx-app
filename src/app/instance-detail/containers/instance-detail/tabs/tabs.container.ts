import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'ct-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cp-tabs
      [instance]="instance">
    </cp-tabs>`,
})
export class TabsContainerComponent {
  @Input() instance: string;

  constructor() {
  }
}
