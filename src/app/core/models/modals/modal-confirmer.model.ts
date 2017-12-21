import { Modal } from "./modal.model";

export interface ModalConfirmer extends Modal {
  id: string;
  title: string;
  message: string;
}
