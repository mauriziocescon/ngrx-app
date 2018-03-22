import { Injectable } from '@angular/core';
import { Update } from '@ngrx/entity';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { NGXLogger } from 'ngx-logger';

import {
  BlockHooks,
  TextInputBlock,
} from '../../../../../models';

import { BlockActionsIntegrationService } from '../../../../integration';

@Injectable()
export class TextInputHooksTriggerService {
  protected hooks: BlockHooks | undefined;

  protected blockLoadSubject$: Subject<TextInputBlock>;
  readonly blockLoadObservable$: Observable<TextInputBlock>;

  protected blockChangesSubject$: Subject<TextInputBlock>;
  readonly blockChangesObservable$: Observable<TextInputBlock>;

  protected textInputBlockLoadSubscription: Subscription;
  protected textInputBlockChangesSubscription: Subscription;

  constructor(protected logger: NGXLogger,
              protected blockActions: BlockActionsIntegrationService) {
    this.blockLoadSubject$ = new Subject();
    this.blockLoadObservable$ = this.blockLoadSubject$.asObservable();

    this.blockChangesSubject$ = new Subject();
    this.blockChangesObservable$ = this.blockChangesSubject$.asObservable();
  }

  subscribeAll(hooks: BlockHooks): void {
    this.hooks = hooks;

    this.subscribeToTextInputBlockLoad();
    this.subscribeToTextInputBlockChanges();
  }

  unsubscribeAll(): void {
    this.hooks = undefined;

    if (this.textInputBlockLoadSubscription) {
      this.textInputBlockLoadSubscription.unsubscribe();
    }
    if (this.textInputBlockChangesSubscription) {
      this.textInputBlockChangesSubscription.unsubscribe();
    }
  }

  blockDidload(block: TextInputBlock): void {
    this.blockLoadSubject$.next(block);
  }

  blockDidChange(block: Update<TextInputBlock>): void {
    const newBlock = { ...block.changes, hooks: { ...block.changes.hooks } } as TextInputBlock;
    this.blockChangesSubject$.next(newBlock);
  }

  protected subscribeToTextInputBlockLoad(): void {
    this.textInputBlockLoadSubscription = this.blockLoadObservable$
      .subscribe((block: TextInputBlock) => {
        try {
          if (this.hooks && block.hooks.textInputBlockDidLoad) {
            const textInputBlockDidLoad = this.hooks[block.hooks.textInputBlockDidLoad];
            if (textInputBlockDidLoad) {
              textInputBlockDidLoad(block, this.blockActions.getActions());
            }
          }
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }

  protected subscribeToTextInputBlockChanges(): void {
    this.textInputBlockChangesSubscription = this.blockChangesObservable$
      .subscribe((block: TextInputBlock) => {
        try {
          if (this.hooks && block.hooks.textInputBlockDidChange) {
            const textInputBlockDidChange = this.hooks[block.hooks.textInputBlockDidChange];
            if (textInputBlockDidChange) {
              textInputBlockDidChange(block, this.blockActions.getActions());
            }
          }
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }
}
