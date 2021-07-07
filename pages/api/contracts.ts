import { NextApiRequest, NextApiResponse } from "next";
import { TContract } from "../../types/Contracts";
import db from "../../utils/db";

export default async (req: NextApiRequest, res: NextApiResponse<TContract[]>): Promise<void> => {
  try {
    const contracts = await db.collection("contracts").get();
    const contractsData = contracts.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as TContract & { id: string })
    );
    res.status(200).json([...contractsData]);
  } catch (e) {
    res.status(400).end();
  }
};