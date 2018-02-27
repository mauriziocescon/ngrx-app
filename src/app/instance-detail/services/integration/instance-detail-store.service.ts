import { Inject, Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";

import { Block } from "../../models";

import { INSTANCE_DETAIL_STORE_TOKEN, IInstanceDetailStore } from "../../tokens";

import { InstanceParamsService } from "../instance-detail/instance-params.service";

@Injectable()
export class InstanceDetailIntegrationStoreService {
  protected defaultInstanceDetailStore: IInstanceDetailStore;
  protected bInstanceDetailStore: IInstanceDetailStore;

  constructor(protected instanceParams: InstanceParamsService,
              @Inject(INSTANCE_DETAIL_STORE_TOKEN) protected instanceDetailStore: IInstanceDetailStore[]) {
  }

  isSynchronizationRequired(): Observable<boolean> {
    this.defaultInstanceDetailStore = this.instanceDetailStore.find((bh: IInstanceDetailStore) => {
      return bh.key === "base";
    });
    return this.defaultInstanceDetailStore.isSynchronizationRequired();
  }

  getAllEditedBlocksSelector(): Observable<Block[]> {
    const module = this.instanceParams.getInstanceParams().module;
    this.defaultInstanceDetailStore = this.instanceDetailStore.find((bh: IInstanceDetailStore) => {
      return bh.key === module;
    });
    this.bInstanceDetailStore = this.instanceDetailStore.find((bh: IInstanceDetailStore) => {
      return bh.key === "base";
    });
    if (this.bInstanceDetailStore) {
      return this.bInstanceDetailStore.getAllEditedBlocksSelector();
    }
    return this.defaultInstanceDetailStore.getAllEditedBlocksSelector();
  }

  getValiditySelector(): Observable<boolean> {
    const module = this.instanceParams.getInstanceParams().module;
    this.defaultInstanceDetailStore = this.instanceDetailStore.find((bh: IInstanceDetailStore) => {
      return bh.key === module;
    });
    this.bInstanceDetailStore = this.instanceDetailStore.find((bh: IInstanceDetailStore) => {
      return bh.key === "base";
    });
    if (this.bInstanceDetailStore) {
      return this.bInstanceDetailStore.getValiditySelector();
    }
    return this.defaultInstanceDetailStore.getValiditySelector();
  }
}
