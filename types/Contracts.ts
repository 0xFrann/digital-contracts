export enum EContractStatus {
  created = "created",
  signed = "signed",
  approved = "approved",
  canceled = "canceled",
}

export type TContractStatus =
  | EContractStatus.created
  | EContractStatus.signed
  | EContractStatus.approved
  | EContractStatus.canceled;

export type TContract = {
  id: string;
  firstName: string;
  lastName: string;
  idNumber: number;
  idDocPhotos: boolean;
  signImage: string;
  status: TContractStatus;
  updated: string;
};
