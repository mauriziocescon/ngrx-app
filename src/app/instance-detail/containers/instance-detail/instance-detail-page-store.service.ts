import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as instanceDetailEffects from '../../actions/instance-detail-effects.actions';

import * as fromBlocks from '../../../blocks/reducers';

@Injectable()
export class InstanceDetailPageStoreService {

  constructor(protected store$: Store<fromBlocks.State>) {
  }

  isSyncRequired(): Observable<boolean> {
    return this.store$.pipe(
      select(fromBlocks.isSyncRequired),
      map(data => data.syncRequired),
    );
  }

  startEffects(): void {
    this.store$.dispatch(new instanceDetailEffects.StartEffects());
  }

  stopEffects(): void {
    this.store$.dispatch(new instanceDetailEffects.StopEffects());
  }
}
