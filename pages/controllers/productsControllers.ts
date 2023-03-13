import { IArticle } from "@/types/commonTypes";
import { v4 as uuidv4 } from "uuid";
import { readFile, writeFile } from "fs/promises";
import { dbPath } from "../api/products";

const getRandomPosterUrl = () => {
  const posterId = Math.floor(Math.random() * 1050);
  return `https://picsum.photos/id/${posterId}/300/200`;
};

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
  const result = await readFile(dbPath, { encoding: "utf8" });
  const parsedResult = JSON.parse(result);
  const articleId = uuidv4();
  const articlePoster = getRandomPosterUrl();
  parsedResult.push({ id: articleId, poster: articlePoster, ...article });
  await writeFile(dbPath, JSON.stringify(parsedResult));
  return article;
}

export async function removeArticle(id: string): Promise<string> {
  const result = await readFile(dbPath, { encoding: "utf8" });
  const parsedResult = JSON.parse(result);
  const index = parsedResult.findIndex((item: IArticle) => item.id === id);
  parsedResult.splice(index, 1);
  await writeFile(dbPath, JSON.stringify(parsedResult));
  return id;
}

export async function updateArticle(
  id: string,
  updatedArticle: IArticle
): Promise<IArticle> {
  const result = await readFile(dbPath, { encoding: "utf8" });
  const parsedResult = JSON.parse(result);
  const index = parsedResult.findIndex((item: IArticle) => item.id === id);
  await writeFile(
    dbPath,
    JSON.stringify(parsedResult.splice(index, 1, updatedArticle)),
    "utf8"
  );
  return updatedArticle;
}
