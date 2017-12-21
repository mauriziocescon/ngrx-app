import { ModalType } from "./modal-types";

export interface Modal {
  id: string;
  type: ModalType;
  title: string;
  message: string;
}
