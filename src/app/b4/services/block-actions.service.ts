import { Injectable } from '@angular/core';

import { IBlockActions } from '../../instance-detail/instance-detail.module';

import { module } from '../constants';

import { B4DossierActionsService } from './blocks/dossier/dossier-actions.service';

@Injectable()
export class B4BlockActionsService implements IBlockActions {
  module: string;

  constructor(protected dossierActions: B4DossierActionsService) {
    this.module = module;
  }

  getActions(): any {
    return {
      dossier: {
        ...this.dossierActions.getDossierActions(),
      },
    };
  }
}
