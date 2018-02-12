import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/withLatestFrom";

import { NGXLogger } from "ngx-logger";

import * as list from "../../actions/list.actions";

import { Block, DynBlocksRouteParams } from "../../models";

import * as fromDynamicBlockList from "../../reducers";

import { BlockListService } from "../../services";

@Component({
  selector: "ct-list",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cp-list
      [blocks]="blocks$ | async"
      [loading]="loading$ | async"
      [error]="error$ | async"
      (reloadList)="reloadList()"
      [formValidity]="formValidity$ | async"
      [syncing]="syncRequired$ | async"
      (nextStep)="nextStep()"
      (reset)="reset()">
    </cp-list>`,
})
export class ListContainerComponent implements OnInit, OnDestroy {
  blocks$: Observable<Block[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  syncRequired$: Observable<boolean>;
  formValidity$: Observable<boolean>;
  editBlocks: Observable<Block[]>;

  paramMapSubscription: Subscription;
  syncRequired$Subscription: Subscription;

  constructor(protected store$: Store<fromDynamicBlockList.State>,
              protected route: ActivatedRoute,
              protected logger: NGXLogger,
              protected blocksList: BlockListService) {
    this.blocks$ = this.store$.select(fromDynamicBlockList.getFetchedBlocksState);
    this.loading$ = this.store$.select(fromDynamicBlockList.getFetchLoadingState);
    this.error$ = this.store$.select(fromDynamicBlockList.getFetchErrorState);

    this.syncRequired$ = this.store$.select(fromDynamicBlockList.isSynchronizationRequiredState);
  }

  ngOnInit(): void {
    this.subscribeToParamMap();
    this.subscribeToSyncing();
  }

  protected subscribeToParamMap(): void {
    this.paramMapSubscription = this.route.paramMap
      .subscribe((paramMap: ParamMap) => {
        const params = this.getRouteParams();
        this.formValidity$ = this.blocksList.getValiditySelector(params.module, params.instance, params.step);
        this.editBlocks = this.blocksList.getAllEditBlocksSelector(params.module, params.instance, params.step);

        if (params.module && params.instance && params.step) {
          this.store$.dispatch(new list.ClearBlocks());
          this.reloadList(params.module, params.instance, params.step);
        }
      });
  }

  protected subscribeToSyncing(): void {
    this.syncRequired$Subscription = this.syncRequired$
      .debounceTime(1000)
      .withLatestFrom(this.editBlocks)
      .subscribe(([syncRequired, blocks]) => {
        if (syncRequired) {
          const payload = {
            ...this.getRouteParams(),
            blocks: blocks,
          };
          this.store$.dispatch(new list.UpdateBlocks(payload));
        }
      });
  }

  reloadList(module?: string, instance?: string, step?: string): void {
    const params = this.getRouteParams();
    const mod = module || params.module;
    const inst = instance || params.instance;
    const st = step || params.step;

    this.store$.dispatch(new list.FetchBlocks({module: mod, instance: inst, step: st}));
  }

  canDeactivate(): Observable<boolean> {
    return this.store$.select(fromDynamicBlockList.isSynchronizationRequiredState);
  }

  nextStep(): void {
    // dispatch action to move forward
    this.logger.log(`ListContainerComponent: save`);
  }

  reset(): void {
    // dispatch action to reset the store
    this.logger.log(`ListContainerComponent: reset`);
  }

  protected getRouteParams(module?: string, instance?: string, step?: string): DynBlocksRouteParams {
    const mod = module || this.route.snapshot.paramMap.get("module");
    const inst = instance || this.route.snapshot.paramMap.get("instance");
    const st = step || this.route.snapshot.paramMap.get("step");

    return {
      module: mod,
      instance: inst,
      step: st,
    };
  }

  ngOnDestroy(): void {
    this.unsubscribeToParamMap();
  }

  protected unsubscribeToParamMap(): void {
    if (this.paramMapSubscription) {
      this.paramMapSubscription.unsubscribe();
    }

    if (this.syncRequired$Subscription) {
      this.syncRequired$Subscription.unsubscribe();
    }
  }
}
