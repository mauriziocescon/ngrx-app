import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";

import { NGXLogger } from "ngx-logger";

import * as fromDynamicForm from "../../reducers";
import * as list from "../../actions/list.actions";
import { Block } from "../../models";

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
      (validate)="save()"
      (reset)="reset()">
    </cp-list>`,
})
export class ListContainerComponent implements OnInit {
  blocks$: Observable<Block[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  formValidity$: Observable<boolean>;

  constructor(protected store: Store<fromDynamicForm.State>, private logger: NGXLogger) {
    this.blocks$ = this.store.select(fromDynamicForm.getBlocksListState);
    this.loading$ = this.store.select(fromDynamicForm.getLoadingListState);
    this.error$ = this.store.select(fromDynamicForm.getErrorListState);

    this.formValidity$ = this.store.select(fromDynamicForm.getAllEditBlocksValidityState);
  }

  ngOnInit(): void {
    this.reloadList();
  }

  reloadList(): void {
    this.store.dispatch(new list.FetchBlocks());
  }

  save(): void {
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
