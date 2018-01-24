import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";

import { NGXLogger } from "ngx-logger";

import * as list from "../../actions/list.actions";
import * as fromDynamicForm from "../../reducers";
import { Block } from "../../models";
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
      (nextStep)="nextStep()"
      (reset)="reset()">
    </cp-list>`,
})
export class ListContainerComponent implements OnInit {
  blocks$: Observable<Block[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  formValidity$: Observable<boolean>;

  constructor(protected store: Store<fromDynamicForm.State>,
              protected logger: NGXLogger,
              protected blocksList: BlockListService) {
    this.blocks$ = this.store.select(fromDynamicForm.getBlocksListState);
    this.loading$ = this.store.select(fromDynamicForm.getLoadingListState);
    this.error$ = this.store.select(fromDynamicForm.getErrorListState);

    this.formValidity$ = this.blocksList.getValiditySelector();
  }

  ngOnInit(): void {
    this.reloadList();
  }

  reloadList(): void {
    this.store.dispatch(new list.FetchBlocks());
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
}
