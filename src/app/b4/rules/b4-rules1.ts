import {
  CheckBoxBlock,
  DropdownBlock,
  TextInputBlock,
} from "../../instance-detail/instance-detail.module";

import {
  B4BlockActions,
  DossierBlock,
} from "../models";

import * as utilities from "./utils/utilities";
import * as validators from "./validations";

// variables
// --------------
const blocks: { [id: string]: CheckBoxBlock | DropdownBlock | TextInputBlock | DossierBlock } = {};

// blocks loaded
// --------------
export const dossierBlockDidLoad = (dossierBlock: DossierBlock, blockActions: B4BlockActions) => {
  blocks[dossierBlock.id] = dossierBlock;

  const valid = validators.dossierBlockValidator(dossierBlock);
  if (valid !== dossierBlock.valid) {
    blockActions.dossier.setValidityForBlockId(valid, dossierBlock.id);
  }
};

// blocks changed
// --------------
export const dossierBlockDidChange = (dossierBlock: DossierBlock, blockActions: B4BlockActions) => {
  blocks[dossierBlock.id] = dossierBlock;

  const valid = validators.dossierBlockValidator(dossierBlock);
  if (valid !== dossierBlock.valid) {
    blockActions.dossier.setValidityForBlockId(valid, dossierBlock.id);
  }
};
