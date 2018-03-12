import { Block } from "../../../instance-detail/instance-detail.module";

export interface DossierBlock extends Block {
  section1?: DossierSection1Block;
  section2?: DossierSection2Block;
  valid: boolean;
  hooks: DossierBlockHooks;
}

export interface DossierSection1Block {
  sectionLabel: string;

  label1: string;
  value1?: string;

  label2: string;
  value2?: boolean;

  label3: string;
  value3?: boolean;
}

export interface DossierSection2Block {
  sectionLabel: string;

  label1: string;
  value1: string;
}

interface DossierBlockHooks {
  dossierBlockDidLoad?: string;
  dossierBlockDidChange?: string;
}
