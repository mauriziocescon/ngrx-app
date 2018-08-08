import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'ct-info',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cp-info>
    </cp-info>`,
})
export class InfoContainerComponent {
  @Input() instance: string;

  constructor() {
  }
}
