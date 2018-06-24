import { Injectable } from '@angular/core';
import { Update } from '@ngrx/entity';

import {
  Observable,
  Subject,
  Subscription,
} from 'rxjs';

import { NGXLogger } from 'ngx-logger';

import { BlockActionsIntegrationService } from '../../../../instance-detail/instance-detail.module';

import {
  B1BlockHooks,
  CheckBoxConfirmerBlock,
} from '../../../models';

@Injectable()
export class B1CheckBoxConfirmerHooksTriggerService {
  protected hooks: B1BlockHooks | undefined;

  protected blockLoadSubject$: Subject<CheckBoxConfirmerBlock>;
  readonly blockLoadObservable$: Observable<CheckBoxConfirmerBlock>;

  protected blockChangesSubject$: Subject<CheckBoxConfirmerBlock>;
  readonly blockChangesObservable$: Observable<CheckBoxConfirmerBlock>;

  protected checkBoxConfirmerBlockLoadSubscription: Subscription;
  protected checkBoxConfirmerBlockChangesSubscription: Subscription;

  constructor(protected logger: NGXLogger,
              protected blockActions: BlockActionsIntegrationService) {
    this.blockLoadSubject$ = new Subject();
    this.blockLoadObservable$ = this.blockLoadSubject$.asObservable();

    this.blockChangesSubject$ = new Subject();
    this.blockChangesObservable$ = this.blockChangesSubject$.asObservable();
  }

  subscribeAll(hooks: B1BlockHooks): void {
    this.hooks = hooks;

    this.subscribeToCheckBoxConfirmerBlockLoad();
    this.subscribeToCheckBoxConfirmerBlockChanges();
  }

  unsubscribeAll(): void {
    this.hooks = undefined;

    if (this.checkBoxConfirmerBlockLoadSubscription) {
      this.checkBoxConfirmerBlockLoadSubscription.unsubscribe();
    }
    if (this.checkBoxConfirmerBlockChangesSubscription) {
      this.checkBoxConfirmerBlockChangesSubscription.unsubscribe();
    }
  }

  blockDidload(block: CheckBoxConfirmerBlock): void {
    this.blockLoadSubject$.next(block);
  }

  blockDidChange(block: Update<CheckBoxConfirmerBlock>): void {
    const newBlock = { ...block.changes, hooks: { ...block.changes.hooks } } as CheckBoxConfirmerBlock;
    this.blockChangesSubject$.next(newBlock);
  }

  protected subscribeToCheckBoxConfirmerBlockLoad(): void {
    this.checkBoxConfirmerBlockLoadSubscription = this.blockLoadObservable$
      .subscribe((block: CheckBoxConfirmerBlock) => {
        try {
          if (this.hooks && block.hooks.checkBoxConfirmerBlockDidLoad) {
            const checkBoxConfirmerBlockDidLoad = this.hooks[block.hooks.checkBoxConfirmerBlockDidLoad];
            if (checkBoxConfirmerBlockDidLoad) {
              checkBoxConfirmerBlockDidLoad(block, this.blockActions.getActions());
            }
          }
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }

  protected subscribeToCheckBoxConfirmerBlockChanges(): void {
    this.checkBoxConfirmerBlockChangesSubscription = this.blockChangesObservable$
      .subscribe((block: CheckBoxConfirmerBlock) => {
        try {
          if (this.hooks && block.hooks.checkBoxConfirmerBlockDidChange) {
            const checkBoxConfirmerBlockDidChange = this.hooks[block.hooks.checkBoxConfirmerBlockDidChange];
            if (checkBoxConfirmerBlockDidChange) {
              checkBoxConfirmerBlockDidChange(block, this.blockActions.getActions());
            }
          }
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }
}
