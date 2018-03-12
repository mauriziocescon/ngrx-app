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
      (valuesDidChange)="valuesDidChange($event)">
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

  valuesDidChange(values: { value1Section1?: string, value2Section1?: string, value3Section1?: boolean, value1Section2?: string }): void {
    this.dispatchValueDidChangeAction(values);
  }

  protected dispatchValueDidChangeAction(values: { value1Section1?: string, value2Section1?: string, value3Section1?: boolean, value1Section2?: string }): void {
    if (this.dossierBlock) {
      const block = {
        block: {
          id: this.blockId,
          changes: {
            id: this.blockId,
            type: B4BlockType.Dossier,
            order: this.dossierBlock.order,
            section1: {
              sectionLabel: this.dossierBlock.section1.sectionLabel,

              label1: this.dossierBlock.section1.label1,
              value1: values.value1Section1 !== undefined ? values.value1Section1 : this.dossierBlock.section1.value1,
              required1: this.dossierBlock.section1.required1,
              disabled1: this.dossierBlock.section1.disabled1,

              label2: this.dossierBlock.section1.label2,
              value2: values.value2Section1 !== undefined ? values.value2Section1 : this.dossierBlock.section1.value2,
              required2: this.dossierBlock.section1.required2,
              disabled2: this.dossierBlock.section1.disabled2,

              label3: this.dossierBlock.section1.label3,
              value3: values.value3Section1 !== undefined ? values.value3Section1 : this.dossierBlock.section1.value3,
              required3: this.dossierBlock.section1.required3,
              disabled3: this.dossierBlock.section1.disabled3,
            },
            section2: {
              sectionLabel: this.dossierBlock.section2.sectionLabel,

              label1: this.dossierBlock.section2.label1,
              value1: values.value1Section2 !== undefined ? values.value1Section2 : this.dossierBlock.section2.value1,
              required1: this.dossierBlock.section2.required1,
              disabled1: this.dossierBlock.section2.disabled1,
            },
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
