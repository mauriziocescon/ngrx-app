import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-unknown-cp',
  templateUrl: './unknown.component.html',
  styleUrls: ['./unknown.component.scss'],
})
export class UnknownComponent {
  @Input() block: any;
  @Output() blockDidChange: EventEmitter<any>;

  constructor() {
    this.blockDidChange = new EventEmitter();
  }
}
