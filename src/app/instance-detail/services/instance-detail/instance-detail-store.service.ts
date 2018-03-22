import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { AppConstantsService } from '../../../core/core.module';

import * as instanceDetailEffects from '../../actions/instance-detail-effects.actions';
import * as list from '../../actions/list/list.actions';

import { Block } from '../../models';

import * as fromInstanceDetail from '../../reducers';

import { IInstanceDetailStore } from '../../tokens';

@Injectable()
export class InstanceDetailStoreService implements IInstanceDetailStore {
  module: string;

  constructor(protected store$: Store<fromInstanceDetail.State>,
              protected appConstants: AppConstantsService) {
    this.module = this.appConstants.Application.INSTANCE_DETAIL_MODULE;
  }

  dispatchStartEffects(): void {
    this.store$.dispatch(new instanceDetailEffects.StartEffects());
  }

  dispatchStopEffects(): void {
    this.store$.dispatch(new instanceDetailEffects.StopEffects());
  }

  isSynchronizationRequired(): Observable<boolean> {
    return this.store$.select(fromInstanceDetail.isSynchronizationRequiredState);
  }

  getAllEditedBlocksSelector(): Observable<Block[]> {
    return this.store$.select(fromInstanceDetail.getAllEditedBlocksState);
  }

  getValiditySelector(): Observable<boolean> {
    return this.store$.select(fromInstanceDetail.getAllEditedBlocksValidityState);
  }

  dispatchClearBlocks(): void {
    this.store$.dispatch(new list.ClearBlocks());
  }
}
