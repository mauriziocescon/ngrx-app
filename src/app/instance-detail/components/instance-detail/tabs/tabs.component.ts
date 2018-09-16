import { Component, Input } from '@angular/core';

@Component({
  selector: 'cp-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  @Input() instance: string;

  justify: string;

  constructor() {
    this.justify = 'center';
  }
}
