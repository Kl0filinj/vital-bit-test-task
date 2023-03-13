import {
  addArticle,
  getAllArticles,
} from "@/pages/controllers/productsControllers";
import RequestError from "@/pages/helpers/RequestError";
import newArticleSchema from "@/pages/helpers/validation";
import { validatedAsyncWrapper } from "@/pages/middleware/validationMiddleware";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

export const dbPath = path.resolve("db/products.json");

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      const articles = await getAllArticles();
      if (!articles) {
        return RequestError(res, 404, "Not found");
      }
      return res.status(200).json({ data: articles });

    case "POST":
      const newArticle = await addArticle(body);
      if (!newArticle) {
        return RequestError(res, 404, "Not found");
      }
      return res.status(201).json({ data: newArticle });

    default:
      break;
  }
}

export default validatedAsyncWrapper(newArticleSchema, handler);
