import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Update } from "@ngrx/entity";

import * as dossier from "../../../actions/blocks/dossier.actions";

import { B4BlockType, DossierBlock, DossierActions } from "../../../models";

import * as fromB4Blocks from "../../../reducers";

@Injectable()
export class B4DossierActionsService {

  constructor(protected store$: Store<fromB4Blocks.State>) {
  }

  getDossierActions(): DossierActions {
    return {
      changeLoading: (loading: boolean, blockId: string) => this.changeLoading(loading, blockId),
      setValidityForBlockId: (valid: boolean, blockId: string) => this.setValidityForBlockId(valid, blockId),
    };
  }

  changeLoading(loading: boolean, blockId: string): void {
    const newLoading = {
      id: blockId,
      loading: loading,
    };
    this.store$.dispatch(new dossier.Loading(newLoading));
  }

  protected dispatchUpdate(block: Update<DossierBlock>): void {
    const newBlock = {block: block, triggerHooks: false};
    this.store$.dispatch(new dossier.UpdateBlock(newBlock));
  }

  setValidityForBlockId(valid: boolean, blockId: string): void {
    const newBlock: Update<DossierBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: B4BlockType.Dossier,
        valid: valid,
      },
    };
    this.dispatchUpdate(newBlock);
  }
}
