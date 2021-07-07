import { NextApiRequest, NextApiResponse } from "next";
import { TContract } from "../../../types/Contracts";
import db from "../../../utils/db";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<TContract | { message: string }>
): Promise<void> => {
  const { id } = req.query;

  try {
    if (req.method === "PUT") {
      await db
        .collection("contracts")
        .doc(id as string)
        .update({
          ...JSON.parse(req.body),
          updated: new Date().toISOString(),
        });
      res.status(200).json({ message: "Contract modified" });
    } else if (req.method === "GET") {
      const doc = await db
        .collection("contracts")
        .doc(id as string)
        .get();
      if (!doc.exists) {
        res.status(404).json({ message: "Contract doesn't exists" });
      } else {
        res.status(200).json({ id: doc.id, ...doc.data() } as TContract & { id: string });
      }
    } else if (req.method === "DELETE") {
      await db
        .collection("contracts")
        .doc(id as string)
        .delete();
      res.status(200).json({ message: "Contract deleted" });
    }
  } catch (e) {
    res.status(400).end();
  }
};
