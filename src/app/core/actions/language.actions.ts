import { Action } from "@ngrx/store";

export enum LanguageActionTypes {
  SET_LANGUAGE = "[Language] Set language",
}

export class SetLanguage implements Action {
  readonly type = LanguageActionTypes.SET_LANGUAGE;

  constructor(public payload: string) {
  }
}

export type LanguageActions =
  SetLanguage;
