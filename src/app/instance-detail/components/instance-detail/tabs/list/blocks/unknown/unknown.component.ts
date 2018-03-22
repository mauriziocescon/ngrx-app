import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-unknown',
  templateUrl: './unknown.component.html',
  styleUrls: ['./unknown.component.scss'],
})
export class UnknownComponent {
  @Input() block: any;

  constructor() {
  }
}
