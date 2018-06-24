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
  B2BlockHooks,
  DatePickerBlock,
} from '../../../models';

@Injectable()
export class B2DatePickerHooksTriggerService {
  protected hooks: B2BlockHooks | undefined;

  protected blockLoadSubject$: Subject<DatePickerBlock>;
  readonly blockLoadObservable$: Observable<DatePickerBlock>;

  protected blockChangesSubject$: Subject<DatePickerBlock>;
  readonly blockChangesObservable$: Observable<DatePickerBlock>;

  protected datePickerBlockLoadSubscription: Subscription;
  protected datePickerBlockChangesSubscription: Subscription;

  constructor(protected logger: NGXLogger,
              protected blockActions: BlockActionsIntegrationService) {
    this.blockLoadSubject$ = new Subject();
    this.blockLoadObservable$ = this.blockLoadSubject$.asObservable();

    this.blockChangesSubject$ = new Subject();
    this.blockChangesObservable$ = this.blockChangesSubject$.asObservable();
  }

  subscribeAll(hooks: B2BlockHooks): void {
    this.hooks = hooks;

    this.subscribeToDatePickerBlockLoad();
    this.subscribeToDatePickerBlockChanges();
  }

  unsubscribeAll(): void {
    this.hooks = undefined;

    if (this.datePickerBlockLoadSubscription) {
      this.datePickerBlockLoadSubscription.unsubscribe();
    }
    if (this.datePickerBlockChangesSubscription) {
      this.datePickerBlockChangesSubscription.unsubscribe();
    }
  }

  blockDidload(block: DatePickerBlock): void {
    this.blockLoadSubject$.next(block);
  }

  blockDidChange(block: Update<DatePickerBlock>): void {
    const newBlock = { ...block.changes, hooks: { ...block.changes.hooks } } as DatePickerBlock;
    this.blockChangesSubject$.next(newBlock);
  }

  protected subscribeToDatePickerBlockLoad(): void {
    this.datePickerBlockLoadSubscription = this.blockLoadObservable$
      .subscribe((block: DatePickerBlock) => {
        try {
          if (this.hooks && block.hooks.datePickerBlockDidLoad) {
            const datePickerBlockDidLoad = this.hooks[block.hooks.datePickerBlockDidLoad];
            if (datePickerBlockDidLoad) {
              datePickerBlockDidLoad(block, this.blockActions.getActions());
            }
          }
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }

  protected subscribeToDatePickerBlockChanges(): void {
    this.datePickerBlockChangesSubscription = this.blockChangesObservable$
      .subscribe((block: DatePickerBlock) => {
        try {
          if (this.hooks && block.hooks.datePickerBlockDidChange) {
            const datePickerBlockDidChange = this.hooks[block.hooks.datePickerBlockDidChange];
            if (datePickerBlockDidChange) {
              datePickerBlockDidChange(block, this.blockActions.getActions());
            }
          }
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }
}
