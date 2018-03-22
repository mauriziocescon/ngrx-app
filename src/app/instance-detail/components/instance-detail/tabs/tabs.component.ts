import { Component, Input } from '@angular/core';

import { InstanceParams } from '../../../models';

@Component({
  selector: 'cp-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  @Input() instanceParams: InstanceParams;

  justify: string;

  constructor() {
    this.justify = 'justified';
  }
}
