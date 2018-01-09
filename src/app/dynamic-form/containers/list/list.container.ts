import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";

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
      (reloadList)="reloadList()">
    </cp-list>`,
})
export class ListContainerComponent implements OnInit {
  blocks$: Observable<Block[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  isFormValid$: Observable<boolean>;

  constructor(protected store: Store<fromDynamicForm.State>) {
    this.blocks$ = this.store.select(fromDynamicForm.getBlocksListState);
    this.loading$ = this.store.select(fromDynamicForm.getLoadingListState);
    this.error$ = this.store.select(fromDynamicForm.getErrorListState);

    this.isFormValid$ = this.store.select(fromDynamicForm.getEditBlocksValidityState);

    this.isFormValid$
      .subscribe((vaue) => {
        console.log(`isFormValid$: ${vaue}`);
      });
  }

  ngOnInit(): void {
    this.reloadList();
  }

  reloadList(): void {
    this.store.dispatch(new list.FetchBlocks());
  }
}
