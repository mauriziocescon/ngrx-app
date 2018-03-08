import { Component, ChangeDetectionStrategy, Input } from "@angular/core";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { B4BlockType, DossierBlock } from "../../../models";

import { DossierStoreService } from "./dossier-store.service";

@Component({
  selector: "ct-dossier",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DossierStoreService,
  ],
  template: `
    <cp-dossier
      [block]="block$ | async"
      [loading]="loading$ | async"
      (valueDidChange)="valueDidChange()">
    </cp-dossier>`,
})
export class DossierContainerComponent {
  @Input() blockId: string;

  block$: Observable<DossierBlock | undefined>;
  dossierBlock: DossierBlock | undefined;

  loading$: Observable<boolean>;

  constructor(protected dossierStore: DossierStoreService) {
    this.block$ = this.dossierStore.getAllDossier()
      .map((blocks: DossierBlock[]) => {
        return blocks.find((block: DossierBlock) => {
          return block.id === this.blockId;
        });
      })
      .map((block: DossierBlock | undefined) => {
        return this.dossierBlock = block;
      });

    this.loading$ = this.dossierStore.getDossierBlocksLoading()
      .map((blocksLoading: { [id: string]: boolean }) => {
        return blocksLoading[this.blockId];
      });
  }

  valueDidChange(): void {
    this.dispatchValueDidChangeAction();
  }

  protected dispatchValueDidChangeAction(): void {
    if (this.dossierBlock) {
      const block = {
        block: {
          id: this.blockId,
          changes: {
            id: this.blockId,
            type: B4BlockType.Dossier,
            order: this.dossierBlock.order,

            // ...

            hooks: {
              ...this.dossierBlock.hooks,
            },
          },
        },
        triggerHooks: true,
      };
      this.dossierStore.dispatchUpdateBlock(block);
    }
  }
}
