import { Injectable } from '@angular/core';
import { Update } from '@ngrx/entity';

import { Observable, Subject, Subscription } from 'rxjs';

import { NGXLogger } from 'ngx-logger';

import {
  BlockHooks,
  DropdownBlock,
} from '../../../../../models';

import { BlockActionsIntegrationService } from '../../../../integration';

@Injectable()
export class DropdownHooksTriggerService {
  protected hooks: BlockHooks | undefined;

  protected blockLoadSubject$: Subject<DropdownBlock>;
  readonly blockLoadObservable$: Observable<DropdownBlock>;

  protected blockChangesSubject$: Subject<DropdownBlock>;
  readonly blockChangesObservable$: Observable<DropdownBlock>;

  protected dropdownBlockLoadSubscription: Subscription;
  protected dropdownBlockChangesSubscription: Subscription;

  constructor(protected logger: NGXLogger,
              protected blockActions: BlockActionsIntegrationService) {
    this.blockLoadSubject$ = new Subject();
    this.blockLoadObservable$ = this.blockLoadSubject$.asObservable();

    this.blockChangesSubject$ = new Subject();
    this.blockChangesObservable$ = this.blockChangesSubject$.asObservable();
  }

  subscribeAll(hooks: BlockHooks): void {
    this.hooks = hooks;

    this.subscribeToDropdownBlockLoad();
    this.subscribeToDropdownBlockChanges();
  }

  unsubscribeAll(): void {
    this.hooks = undefined;

    if (this.dropdownBlockLoadSubscription) {
      this.dropdownBlockLoadSubscription.unsubscribe();
    }
    if (this.dropdownBlockChangesSubscription) {
      this.dropdownBlockChangesSubscription.unsubscribe();
    }
  }

  blockDidload(block: DropdownBlock): void {
    this.blockLoadSubject$.next(block);
  }

  blockDidChange(block: Update<DropdownBlock>): void {
    const newBlock = { ...block.changes, hooks: { ...block.changes.hooks } } as DropdownBlock;
    this.blockChangesSubject$.next(newBlock);
  }

  protected subscribeToDropdownBlockLoad(): void {
    this.dropdownBlockLoadSubscription = this.blockLoadObservable$
      .subscribe((block: DropdownBlock) => {
        try {
          if (this.hooks && block.hooks.dropdownBlockDidLoad) {
            const dropdownBlockDidLoad = this.hooks[block.hooks.dropdownBlockDidLoad];
            if (dropdownBlockDidLoad) {
              dropdownBlockDidLoad(block, this.blockActions.getActions());
            }
          }
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }

  protected subscribeToDropdownBlockChanges(): void {
    this.dropdownBlockChangesSubscription = this.blockChangesObservable$
      .subscribe((block: DropdownBlock) => {
        try {
          if (this.hooks && block.hooks.dropdownBlockDidChange) {
            const dropdownBlockDidChange = this.hooks[block.hooks.dropdownBlockDidChange];
            if (dropdownBlockDidChange) {
              dropdownBlockDidChange(block, this.blockActions.getActions());
            }
          }
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }
}
