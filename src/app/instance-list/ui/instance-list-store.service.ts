import { inject, Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import { Instance } from '../models';

import { actionGroup } from '../store/instance-list.actions';
import { feature } from '../store/instance-list.feature';

@Injectable()
export class InstanceListStoreService {
  protected store$ = inject(Store);

  getInstances(): Observable<Instance[] | undefined> {
    return this.store$.pipe(select(feature.getInstances));
  }

  getInstanceById(id: string): Observable<Instance | undefined> {
    return this.store$.pipe(select(feature.getInstanceById(id)));
  }

  isLoadingInstances(): Observable<boolean> {
    return this.store$.pipe(select(feature.isLoading));
  }

  getLoadingError(): Observable<string | undefined> {
    return this.store$.pipe(select(feature.getError));
  }

  loadInstances(params: { textSearch: string }): void {
    this.store$.dispatch(actionGroup.loadInstances(params));
  }

  startEffects(): void {
    this.store$.dispatch(actionGroup.startEffects());
  }

  stopEffects(): void {
    this.store$.dispatch(actionGroup.stopEffects());
  }
}
