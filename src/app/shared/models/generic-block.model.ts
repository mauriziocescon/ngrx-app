import { EventEmitter } from '@angular/core';

import { Block } from './block.model';

export interface BlockComponent {
  block: Block;
  blockDidChange: EventEmitter<Block>;
}
