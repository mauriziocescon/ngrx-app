import { Injectable } from '@angular/core';
import { Update } from '@ngrx/entity';

import { Observable, Subject, Subscription } from 'rxjs';

import { NGXLogger } from 'ngx-logger';

import {
  BlockHooks,
  CheckBoxBlock,
} from '../../../../../models';

import { BlockActionsIntegrationService } from '../../../../integration';

@Injectable()
export class CheckBoxHooksTriggerService {
  protected hooks: BlockHooks | undefined;

  protected blockLoadSubject$: Subject<CheckBoxBlock>;
  readonly blockLoadObservable$: Observable<CheckBoxBlock>;

  protected blockChangesSubject$: Subject<CheckBoxBlock>;
  readonly blockChangesObservable$: Observable<CheckBoxBlock>;

  protected checkBoxBlockLoadSubscription: Subscription;
  protected checkBoxBlockChangesSubscription: Subscription;

  constructor(protected logger: NGXLogger,
              protected blockActions: BlockActionsIntegrationService) {
    this.blockLoadSubject$ = new Subject();
    this.blockLoadObservable$ = this.blockLoadSubject$.asObservable();

    this.blockChangesSubject$ = new Subject();
    this.blockChangesObservable$ = this.blockChangesSubject$.asObservable();
  }

  subscribeAll(hooks: BlockHooks): void {
    this.hooks = hooks;

    this.subscribeToCheckBoxBlockLoad();
    this.subscribeToCheckBoxBlockChanges();
  }

  unsubscribeAll(): void {
    this.hooks = undefined;

    if (this.checkBoxBlockLoadSubscription) {
      this.checkBoxBlockLoadSubscription.unsubscribe();
    }
    if (this.checkBoxBlockChangesSubscription) {
      this.checkBoxBlockChangesSubscription.unsubscribe();
    }
  }

  blockDidload(block: CheckBoxBlock): void {
    this.blockLoadSubject$.next(block);
  }

  blockDidChange(block: Update<CheckBoxBlock>): void {
    const newBlock = { ...block.changes, hooks: { ...block.changes.hooks } } as CheckBoxBlock;
    this.blockChangesSubject$.next(newBlock);
  }

  protected subscribeToCheckBoxBlockLoad(): void {
    this.checkBoxBlockLoadSubscription = this.blockLoadObservable$
      .subscribe((block: CheckBoxBlock) => {
        try {
          if (this.hooks && block.hooks.checkBoxBlockDidLoad) {
            const checkBoxBlockDidLoad = this.hooks[block.hooks.checkBoxBlockDidLoad];
            if (checkBoxBlockDidLoad) {
              checkBoxBlockDidLoad(block, this.blockActions.getActions());
            }
          }
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }

  protected subscribeToCheckBoxBlockChanges(): void {
    this.checkBoxBlockChangesSubscription = this.blockChangesObservable$
      .subscribe((block: CheckBoxBlock) => {
        try {
          if (this.hooks && block.hooks.checkBoxBlockDidChange) {
            const checkBoxBlockDidChange = this.hooks[block.hooks.checkBoxBlockDidChange];
            if (checkBoxBlockDidChange) {
              checkBoxBlockDidChange(block, this.blockActions.getActions());
            }
          }
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }
}
