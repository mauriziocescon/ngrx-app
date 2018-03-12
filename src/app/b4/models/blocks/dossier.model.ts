import { Block } from "../../../instance-detail/instance-detail.module";

export interface DossierBlock extends Block {
  section1: DossierSection1Block;
  section2: DossierSection2Block;
  valid: boolean;
  hooks: DossierBlockHooks;
}

export interface DossierSection1Block {
  sectionLabel: string;

  label1: string;
  value1?: string;
  required1: boolean;

  label2: string;
  value2?: string;
  required2: boolean;

  label3: string;
  value3?: boolean;
  required3: boolean;
}

export interface DossierSection2Block {
  sectionLabel: string;

  label1: string;
  value1: string;
  required1: boolean;
}

interface DossierBlockHooks {
  dossierBlockDidLoad?: string;
  dossierBlockDidChange?: string;
}
