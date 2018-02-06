import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

import { NGXLogger } from "ngx-logger";

import * as list from "../../actions/list.actions";
import * as fromDynamicBlocksList from "../../reducers";
import { Block } from "../../models";
import { BlockListService } from "../../services";
import { ParamMap } from "@angular/router/src/shared";

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
      (nextStep)="nextStep()"
      (reset)="reset()">
    </cp-list>`,
})
export class ListContainerComponent implements OnInit, OnDestroy{
  blocks$: Observable<Block[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  formValidity$: Observable<boolean>;

  paramMapSubscription: Subscription;

  constructor(protected store: Store<fromDynamicBlocksList.State>,
              protected route: ActivatedRoute,
              protected logger: NGXLogger,
              protected blocksList: BlockListService) {
    this.blocks$ = this.store.select(fromDynamicBlocksList.getFetchedBlocksState);
    this.loading$ = this.store.select(fromDynamicBlocksList.getFetchLoadingState);
    this.error$ = this.store.select(fromDynamicBlocksList.getFetchErrorState);
  }

  ngOnInit(): void {
    this.paramMapSubscription = this.route.paramMap
      .subscribe((paramMap: ParamMap) => {
        const module = paramMap.get("module");
        const instance = paramMap.get("instance");
        const step = paramMap.get("step");

        this.formValidity$ = this.blocksList.getValiditySelector(module, instance, step);

        if (module && instance && step) {
          this.store.dispatch(new list.ClearBlocks());
          this.reloadList(module, instance, step);
        }
      });
  }

  reloadList(module?: string, instance?: string, step?: string): void {
    const mod = module || this.route.snapshot.paramMap.get("module");
    const inst = instance || this.route.snapshot.paramMap.get("instance");
    const st = step || this.route.snapshot.paramMap.get("step");

    this.store.dispatch(new list.FetchBlocks({module: mod, instance: inst, step: st}));
  }

  nextStep(): void {
    // dispatch action to synch with the server
    // this.store.dispatch(new list.FetchBlocks());

    this.logger.log(`ListContainerComponent: save`);
  }

  reset(): void {
    // dispatch action to reset the store
    // this.store.dispatch(new list.FetchBlocks());

    this.logger.log(`ListContainerComponent: reset`);
  }

  ngOnDestroy(): void {
    this.unsubscribeToParamMap();
  }

  protected unsubscribeToParamMap(): void {
    if (this.paramMapSubscription) {
      this.paramMapSubscription.unsubscribe();
    }
  }
}
