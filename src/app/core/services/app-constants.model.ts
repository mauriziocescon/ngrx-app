import { Enum } from '../../shared/shared.module';

import { environment } from '../../../environments/environment';

export class Api {
  instances = environment.apiUrl + 'instances';
  blocks = environment.apiUrl + 'blocks';
}

export class Application {
  APP_NAME = 'demo';
  SHOW_JSON_SERVER_API = !environment.production;
  JSON_SERVER_API_URL = environment.apiUrl;
}

export class Languages {
  DE = 'de';
  EN = 'en';
  IT = 'it';
  SUPPORTED_LANG = ['de', 'en', 'it'];
  SUPPORTED_LANG_DESC = ['Deutsch', 'English', 'Italiano'];
  DEFAULT_LANGUAGE = 'en';
}

export class LocalStorageKey {
  LANGUAGE_ID = new Enum('LANGUAGE_ID');
}
