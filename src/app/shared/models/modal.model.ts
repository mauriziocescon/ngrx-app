export interface Modal {
  id: string;
  title: string;
  message: string;
}

export interface ModalAlert extends Modal {
  buttonLabel: string;
}

export interface ModalConfirmer extends Modal {
  yesButtonLabel: string;
  noButtonLabel: string;
}
