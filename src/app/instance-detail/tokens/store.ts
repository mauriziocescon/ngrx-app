import { Observable } from 'rxjs';

import { Block } from '../models';

export interface IInstanceDetailStore {
  module: string;

  dispatchStartEffects(): void;

  dispatchStopEffects(): void;

  getAllEditedBlocksSelector(): Observable<Block[]>;

  getValiditySelector(): Observable<boolean>;
}
