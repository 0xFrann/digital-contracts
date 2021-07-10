export type TContractStatus = "created" | "signed" | "approved" | "canceled";

export type TContract = {
  firstName: string;
  lastName: string;
  idNumber: number;
  completed: false;
  status: TContractStatus;
};
