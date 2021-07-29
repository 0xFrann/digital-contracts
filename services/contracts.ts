import getConfig from "next/config";
import useSWR, { mutate, SWRResponse } from "swr";
import { TContract } from "../types/Contracts";

const { publicRuntimeConfig } = getConfig();
const API_URL = publicRuntimeConfig.API_URL;

const getContracts = (): SWRResponse<TContract[], Error> => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const response = useSWR<TContract[], Error>(`${API_URL}/contracts`);

  return response;
};

const getContract = (id: string): SWRResponse<TContract, Error> => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const response = useSWR<TContract, Error>(`${API_URL}/contract/${id}`);

  return response;
};

const updateContract = async (contract: TContract) => {
  const response = await fetch(`${API_URL}/contract/${contract.id}`, {
    method: "PUT",
    body: JSON.stringify(contract),
  });

  if (response.status === 200) {
    mutate(`${API_URL}/contract/${contract.id}`);
  } else {
    console.log(response);
  }

  return response;
};

const newContract = async (contract: TContract) => {
  const response = await fetch(`${API_URL}/contract`, {
    method: "POST",
    body: JSON.stringify(contract),
  });

  if (response.status === 200) {
    mutate(`${API_URL}/contracts`);
  } else {
    console.log(response);
  }
};

const deleteContract = async (id: string) => {
  const response = await fetch(`${API_URL}/contract/${id}`, {
    method: "DELETE",
    body: JSON.stringify(id),
  });

  if (response.status === 200) {
    mutate(`${API_URL}/contracts`);
  } else {
    console.log(response);
  }
};

export const useContracts = () => {
  return { contracts: getContracts(), getContract, updateContract, newContract, deleteContract };
};
