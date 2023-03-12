import { getUserById } from "@/pages/controllers/productsControllers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  const id = query.productId;

  switch (method) {
    case "GET":
      try {
        const result = await getUserById(String(id));
        return res.status(200).json({ data: result });
      } catch (error: any) {
        return res.status(404).json({ message: "Not found" });
      }

    case "POST":
      break;

    case "DELETE":
      break;

    case "PATCH":
      break;

    default:
      break;
  }
}
