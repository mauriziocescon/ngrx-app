import { Observable } from "rxjs/Observable";

import { Block } from "../models";

export interface IInstanceDetailStore {
  key: string;
  getAllEditedBlocksSelector(): Observable<Block[]>;
  getValiditySelector(): Observable<boolean>;
  isSynchronizationRequired?(): Observable<boolean>;
}
