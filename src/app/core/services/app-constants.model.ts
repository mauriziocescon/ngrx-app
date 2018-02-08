import { Enum } from "../../shared/shared.module";

import { environment } from "../../../environments/environment";

export class Api {
  instances = environment.apiUrl + "instances";
  blocks = environment.apiUrl + "blocks";
  rulesConfig = environment.apiUrl + "rules-config";
}

export class Application {
  APP_NAME = "demo";
}

export class Languages {
  DE = "de";
  EN = "en";
  IT = "it";
  SUPPORTED_LANG = ["de", "en", "it"];
  SUPPORTED_LANG_DESC = ["Deutsch", "English", "Italiano"];
  DEFAULT_LANGUAGE = "en";
}

export class LocalStorageKey {
  LANGUAGE_ID = new Enum("LANGUAGE_ID");
}
