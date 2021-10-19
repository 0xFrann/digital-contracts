import { NextApiRequest, NextApiResponse } from "next";
import { TContract } from "../../../types/Contracts";
import FirebaseAdmin from "../../../services/firebaseAdminService";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<{ id: string } | { message: string }>
): Promise<void> => {
  try {
    const newContract = JSON.parse(req.body);
    const contracts = await FirebaseAdmin.firestore().collection("contracts").get();
    const contractsData = contracts.docs.map((contracts) => contracts.data()) as TContract[];

    if (contractsData.some((contract) => contract.idNumber === newContract.idNumber)) {
      res.status(409).json({
        message: "Contract already exists",
      });
    } else {
      const doc = await FirebaseAdmin.firestore()
        .collection("contracts")
        .add({
          ...newContract,
        });
      await doc.update({
        id: doc.id,
        updated: new Date().toISOString(),
      });

      res.status(200).json({ id: doc.id });
    }
  } catch (e) {
    res.status(400).end();
  }
};
