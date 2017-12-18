import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";

import * as fromDynamicForm from "../../reducers";
import * as list from "../../actions/list.action";
import { Block } from "../../models";

@Component({
  selector: "ct-list",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cp-list
      [blocks]="blocks$ | async"
      [loading]="loading$ | async"
      [error]="error$ | async"
      (reloadList)="reloadList()">
    </cp-list>`,
})
export class ListContainerComponent implements OnInit {
  blocks$: Observable<Block[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private store: Store<fromDynamicForm.State>) {
    this.blocks$ = store.select(fromDynamicForm.getBlocksState);
    this.loading$ = store.select(fromDynamicForm.getLoadingState);
    this.error$ = store.select(fromDynamicForm.getErrorState);
  }

  ngOnInit(): void {
    this.reloadList();
  }

  reloadList(): void {
    this.store.dispatch(new list.FetchBlocks());
  }
}
