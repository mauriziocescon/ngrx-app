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
export const checkBoxBlockDidLoad = (checkBoxBlock: CheckBoxBlock, blockActions: B4BlockActions) => {
  blocks[checkBoxBlock.id] = checkBoxBlock;

  const valid = validators.checkBoxBlockValidator(checkBoxBlock);
  if (valid !== checkBoxBlock.valid) {
    blockActions.checkBox.setValidityForBlockId(valid, checkBoxBlock.id);
  }
};

export const dropdownBlockDidLoad = (dropdownBlock: DropdownBlock, blockActions: B4BlockActions) => {
  blocks[dropdownBlock.id] = dropdownBlock;

  const valid = validators.dropdownBlockValidator(dropdownBlock);
  if (valid !== dropdownBlock.valid) {
    blockActions.dropdown.setValidityForBlockId(valid, dropdownBlock.id);
  }
};

export const textInputBlockDidLoad = (textInputBlock: TextInputBlock, blockActions: B4BlockActions) => {
  blocks[textInputBlock.id] = textInputBlock;

  const valid = validators.textInputBlockValidator(textInputBlock);
  if (valid !== textInputBlock.valid) {
    blockActions.textInput.setValidityForBlockId(valid, textInputBlock.id);
  }
};

export const dossierBlockDidLoad = (dossierBlock: DossierBlock, blockActions: B4BlockActions) => {
  blocks[dossierBlock.id] = dossierBlock;

  const valid = validators.dossierBlockValidator(dossierBlock);
  if (valid !== dossierBlock.valid) {
    blockActions.dossier.setValidityForBlockId(valid, dossierBlock.id);
  }
};

// blocks changed
// --------------
export const checkBoxBlockDidChange = (checkBoxBlock: CheckBoxBlock, blockActions: B4BlockActions) => {
  blocks[checkBoxBlock.id] = checkBoxBlock;

  const valid = validators.checkBoxBlockValidator(checkBoxBlock);
  if (valid !== checkBoxBlock.valid) {
    blockActions.checkBox.setValidityForBlockId(valid, checkBoxBlock.id);
  }

  // change first dossier params
  const firstDossierBlock = utilities.arrayOfDossierBlocksFromBlocksObject(blocks)[0];
  const dossierBlockIndex = firstDossierBlock ? firstDossierBlock.id : undefined;
  if (dossierBlockIndex !== undefined) {
    blockActions.dossier.changeLoading(true, dossierBlockIndex);
    setTimeout(() => {
      blockActions.dossier.changeLoading(false, dossierBlockIndex);
    }, 2000);
  }
};

export const dropdownBlockDidChange = (dropdownBlock: DropdownBlock, blockActions: B4BlockActions) => {
  blocks[dropdownBlock.id] = dropdownBlock;

  const valid = validators.dropdownBlockValidator(dropdownBlock);
  if (valid !== dropdownBlock.valid) {
    blockActions.dropdown.setValidityForBlockId(valid, dropdownBlock.id);
  }
};

export const textInputBlockDidChange = (textInputBlock: TextInputBlock, blockActions: B4BlockActions) => {
  blocks[textInputBlock.id] = textInputBlock;

  const valid = validators.textInputBlockValidator(textInputBlock);
  if (valid !== textInputBlock.valid) {
    blockActions.textInput.setValidityForBlockId(valid, textInputBlock.id);
  }
};

export const dossierBlockDidChange = (dossierBlock: DossierBlock, blockActions: B4BlockActions) => {
  blocks[dossierBlock.id] = dossierBlock;

  const valid = validators.dossierBlockValidator(dossierBlock);
  if (valid !== dossierBlock.valid) {
    blockActions.dossier.setValidityForBlockId(valid, dossierBlock.id);
  }
};
