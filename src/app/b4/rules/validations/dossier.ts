import { DossierBlock } from "../../models";

export const isValid = (dossierBlock: DossierBlock) => {
  if (dossierBlock.section1.required1 === true && dossierBlock.section1.value1 === undefined) {
    return false;
  } else if (dossierBlock.section1.required2 === true && dossierBlock.section1.value2 === undefined) {
    return false;
  } else if (dossierBlock.section1.required3 === true && dossierBlock.section1.value3 === undefined) {
    return false;
  } else if (dossierBlock.section2.required1 === true && dossierBlock.section2.value1 === undefined) {
    return false;
  } else {
    return true;
  }
};