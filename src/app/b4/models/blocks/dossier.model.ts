import { Block } from "../../../instance-detail/instance-detail.module";

export interface DossierBlock extends Block {
  valid: boolean;
  hooks: DossierBlockHooks;
}

interface DossierBlockHooks {
  dossierBlockDidLoad?: string;
  dossierBlockDidChange?: string;
}
