import { IArticle } from "@/types/commonTypes";
import { readFile } from "fs/promises";
import { dbPath } from "../api/products";

export async function getUserById(productId: string) {
  const result = await readFile(dbPath, { encoding: "utf8" });
  const product = JSON.parse(result).find(
    (item: IArticle) => item.id === productId
  );
  return product;
}
