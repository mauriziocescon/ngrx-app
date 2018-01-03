import { Action } from "@ngrx/store";

export enum LanguageActionTypes {
  SET_LANGUAGE = "[Language] Set language",
}

export class SetLanguage implements Action {
  readonly type = LanguageActionTypes.SET_LANGUAGE;

  constructor(public payload: string) {
  }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type LanguageActions =
  SetLanguage;
