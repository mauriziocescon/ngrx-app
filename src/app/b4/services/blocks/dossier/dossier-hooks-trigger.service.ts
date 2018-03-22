import { Injectable } from '@angular/core';
import { Update } from '@ngrx/entity';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { NGXLogger } from 'ngx-logger';

import { BlockActionsIntegrationService } from '../../../../instance-detail/instance-detail.module';

import {
  B4BlockHooks,
  DossierBlock,
} from '../../../models';

@Injectable()
export class B4DossierHooksTriggerService {
  protected hooks: B4BlockHooks | undefined;

  protected blockLoadSubject$: Subject<DossierBlock>;
  readonly blockLoadObservable$: Observable<DossierBlock>;

  protected blockChangesSubject$: Subject<DossierBlock>;
  readonly blockChangesObservable$: Observable<DossierBlock>;

  protected dossierBlockLoadSubscription: Subscription;
  protected dossierBlockChangesSubscription: Subscription;

  constructor(protected logger: NGXLogger,
              protected blockActions: BlockActionsIntegrationService) {
    this.blockLoadSubject$ = new Subject();
    this.blockLoadObservable$ = this.blockLoadSubject$.asObservable();

    this.blockChangesSubject$ = new Subject();
    this.blockChangesObservable$ = this.blockChangesSubject$.asObservable();
  }

  subscribeAll(hooks: B4BlockHooks): void {
    this.hooks = hooks;

    this.subscribeToDossierBlockLoad();
    this.subscribeToDossierBlockChanges();
  }

  unsubscribeAll(): void {
    this.hooks = undefined;

    if (this.dossierBlockLoadSubscription) {
      this.dossierBlockLoadSubscription.unsubscribe();
    }
    if (this.dossierBlockChangesSubscription) {
      this.dossierBlockChangesSubscription.unsubscribe();
    }
  }

  blockDidload(block: DossierBlock): void {
    this.blockLoadSubject$.next(block);
  }

  blockDidChange(block: Update<DossierBlock>): void {
    const newBlock = { ...block.changes, hooks: { ...block.changes.hooks } } as DossierBlock;
    this.blockChangesSubject$.next(newBlock);
  }

  protected subscribeToDossierBlockLoad(): void {
    this.dossierBlockLoadSubscription = this.blockLoadObservable$
      .subscribe((block: DossierBlock) => {
        try {
          if (this.hooks && block.hooks.dossierBlockDidLoad) {
            const dossierBlockDidLoad = this.hooks[block.hooks.dossierBlockDidLoad];
            if (dossierBlockDidLoad) {
              dossierBlockDidLoad(block, this.blockActions.getActions());
            }
          }
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }

  protected subscribeToDossierBlockChanges(): void {
    this.dossierBlockChangesSubscription = this.blockChangesObservable$
      .subscribe((block: DossierBlock) => {
        try {
          if (this.hooks && block.hooks.dossierBlockDidChange) {
            const dossierBlockDidChange = this.hooks[block.hooks.dossierBlockDidChange];
            if (dossierBlockDidChange) {
              dossierBlockDidChange(block, this.blockActions.getActions());
            }
          }
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }
}
