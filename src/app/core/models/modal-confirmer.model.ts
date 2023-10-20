import { Modal } from './modal.model';

export interface ModalConfirmer extends Modal {
  yesButtonLabel: string;
  noButtonLabel: string;
}
