import { IArticle } from "@/types/commonTypes";
import { v4 as uuidv4 } from "uuid";
import { appendFile, readFile } from "fs/promises";
import { dbPath } from "../api/products";

export async function getAllArticles(): Promise<IArticle[]> {
  const products = await readFile(dbPath, { encoding: "utf8" });
  return JSON.parse(products);
}

export async function getArticleById(productId: string): Promise<IArticle> {
  const result = await readFile(dbPath, { encoding: "utf8" });
  const product = JSON.parse(result).find(
    (item: IArticle) => item.id === productId
  );
  return product;
}

export async function addArticle(article: IArticle): Promise<IArticle> {
  const articleId = uuidv4();
  await appendFile(dbPath, JSON.stringify({ id: articleId, ...article }));
  return article;
}
