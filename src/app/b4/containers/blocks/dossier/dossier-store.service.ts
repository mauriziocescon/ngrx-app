import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Observable } from 'rxjs/Observable';

import * as dossier from '../../../actions/blocks/dossier.actions';

import { DossierBlock } from '../../../models';

import * as fromB4Blocks from '../../../reducers';

@Injectable()
export class DossierStoreService {

  constructor(protected store$: Store<fromB4Blocks.State>) {
  }

  getAllDossier(): Observable<DossierBlock[]> {
    return this.store$.select(fromB4Blocks.getAllDossier);
  }

  getDossierBlocksLoading(): Observable<{ [id: string]: boolean }> {
    return this.store$.select(fromB4Blocks.getDossierBlocksLoadingState);
  }

  dispatchUpdateBlock(block: { block: Update<DossierBlock>, triggerHooks: boolean }): void {
    this.store$.dispatch(new dossier.UpdateBlock(block));
  }
}
