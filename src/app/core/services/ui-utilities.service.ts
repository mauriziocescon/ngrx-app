import { Inject } from "@angular/core";

@Inject()
export class UIUtilitiesService {

  constructor() {
  }

  public modalAlert(title: string, message: string, buttonLabel: string): void {

  }

  public modalConfirmer(title: string, message: string, yesButtonLabel: string, noButtonLabel: string, callback: (result: boolean) => void): void {

  }
}
