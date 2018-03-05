import { Inject, Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";

import { AppConstantsService } from "../../../core/core.module";

import { Block } from "../../models";

import { INSTANCE_DETAIL_STORE_TOKEN, IInstanceDetailStore } from "../../tokens";

import { InstanceParamsService } from "../instance-detail/instance-params.service";

@Injectable()
export class InstanceDetailIntegrationStoreService {

  constructor(protected appConstants: AppConstantsService,
              protected instanceParams: InstanceParamsService,
              @Inject(INSTANCE_DETAIL_STORE_TOKEN) protected instanceDetailStore: IInstanceDetailStore[]) {
  }

  protected get defaultInstanceDetailStore(): IInstanceDetailStore {
    return this.instanceDetailStore.find((instanceDetailStore: IInstanceDetailStore) => {
      return instanceDetailStore.module === this.appConstants.Application.INSTANCE_DETAIL_MODULE;
    }) as IInstanceDetailStore;
  }

  protected get bInstanceDetailStore(): IInstanceDetailStore | undefined {
    const module = this.instanceParams.getInstanceParams().module;
    return this.instanceDetailStore.find((instanceDetailStore: IInstanceDetailStore) => {
      return instanceDetailStore.module === module;
    });
  }

  isSynchronizationRequired(): Observable<boolean> {
    // @ts-ignore: error TS2532: Object is possibly 'undefined'.
    return this.defaultInstanceDetailStore.isSynchronizationRequired();
  }

  dispatchClearBlocks(): void {
    // @ts-ignore: error TS2532: Object is possibly 'undefined'.
    this.defaultInstanceDetailStore.dispatchClearBlocks();
  }

  getAllEditedBlocksSelector(): Observable<Block[]> {
    if (this.bInstanceDetailStore) {
      return this.bInstanceDetailStore.getAllEditedBlocksSelector();
    }
    return this.defaultInstanceDetailStore.getAllEditedBlocksSelector();
  }

  getValiditySelector(): Observable<boolean> {
    if (this.bInstanceDetailStore) {
      return this.bInstanceDetailStore.getValiditySelector();
    }
    return this.defaultInstanceDetailStore.getValiditySelector();
  }
}
