import { AppConstantsService } from './app-constants.service';
import { AppLanguageService } from './app-language.service';
import { LocalStorageService } from './local-storage.service';
import { UIUtilitiesService } from './ui-utilities.service';
import { UtilitiesService } from './utilities.service';

export * from './app-constants.service';
export * from './app-language.service';
export * from './local-storage.service';
export * from './ui-utilities.service';
export * from './utilities.service';

export const SERVICES = [
  AppConstantsService,
  AppLanguageService,
  LocalStorageService,
  UIUtilitiesService,
  UtilitiesService,
];
