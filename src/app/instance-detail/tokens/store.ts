import { Observable } from "rxjs/Observable";

import { Block } from "../models";

export interface IInstanceDetailStore {
  module: string;
  dispatchStartEffects(): void;
  dispatchStopEffects(): void;

  getAllEditedBlocksSelector(): Observable<Block[]>;
  getValiditySelector(): Observable<boolean>;

  isSynchronizationRequired?(): Observable<boolean>;
  dispatchClearBlocks?(): void;
}
