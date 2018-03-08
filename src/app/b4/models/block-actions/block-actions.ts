import { BlockActions } from "../../../instance-detail/instance-detail.module";

import { DossierActions } from "./dossier-actions";

export interface B4BlockActions extends BlockActions {
  dossier: DossierActions;
}
