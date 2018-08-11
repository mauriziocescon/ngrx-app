import { Component, Input } from '@angular/core';

@Component({
  selector: 'cp-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  @Input() instance: instance;

  justify: string;

  constructor() {
    this.justify = 'center';
  }
}
