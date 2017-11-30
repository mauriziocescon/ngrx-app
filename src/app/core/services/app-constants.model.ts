import { environment } from "../../../environments/environment";
import { Enum } from "../../shared/utilities/enum";

export class Api {
  public users = environment.apiUrl + "users";
}

export class Application {
  public APP_NAME = "demo";
}

export class Languages {
  public SUPPORTED_LANG = ["en", "it", "de"];
  public SUPPORTED_LANG_DESC = ["English", "Italiano", "Deutsch"];
  public DEFAULT_LANGUAGE = "en";
}

export class LocalStorageKey {
  public LANGUAGE_ID = new Enum("LANGUAGE_ID");
}
