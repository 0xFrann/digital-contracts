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

type TFile = {
  fileName: string;
  fileLocation: string;
};

export type TContract = {
  id: string;
  firstName: string;
  lastName: string;
  idNumber: number;
  idDocPhotos: { front: TFile; back: TFile };
  signImage: string;
  status: TContractStatus;
  updated: string;
};
