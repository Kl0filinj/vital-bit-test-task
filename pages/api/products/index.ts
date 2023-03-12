import { readFile } from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

export const dbPath = path.resolve("db/products.json");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const products = await readFile(dbPath, { encoding: "utf8" });
    return res.status(200).json({ text: JSON.parse(products) });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}
