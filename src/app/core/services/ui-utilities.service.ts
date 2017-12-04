import { Injectable } from "@angular/core";

@Injectable()
export class UIUtilitiesService {

  constructor() {
  }

  modalAlert(title: string, message: string, buttonLabel: string): void {

  }

  modalConfirmer(title: string, message: string, yesButtonLabel: string, noButtonLabel: string, callback: (result: boolean) => void): void {

  }
}
