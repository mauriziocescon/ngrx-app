import { environment } from "../../../environments/environment";
import { Enum } from "../../shared/utilities/enum";

export class Api {
  public blocks = environment.apiUrl + "blocks";
}

export class Application {
  public APP_NAME = "demo";
}

export class Languages {
  public DE = "de";
  public EN = "en";
  public IT = "it";
  public SUPPORTED_LANG = ["de", "en", "it"];
  public SUPPORTED_LANG_DESC = ["Deutsch", "English", "Italiano"];
  public DEFAULT_LANGUAGE = "en";
}

export class LocalStorageKey {
  public LANGUAGE_ID = new Enum("LANGUAGE_ID");
}
