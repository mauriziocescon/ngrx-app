export interface DossierActions {
  changeLoading: (loading: boolean, blockId: string) => void;
  setValidityForBlockId: (valid: boolean, blockId: string) => void;
}
