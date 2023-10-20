import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-unknown-cp',
  templateUrl: './unknown.component.html',
  styles: [`
    .unknown-component {
      padding-top: 10px;
    }
  `],
})
export class UnknownComponent {
  @Input() block: any;
  @Output() blockDidChange: EventEmitter<any>;

  constructor() {
    this.blockDidChange = new EventEmitter();
  }
}
