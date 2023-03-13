import {
  getArticleById,
  removeArticle,
  updateArticle,
} from "@/pages/controllers/productsControllers";
import RequestError from "@/pages/helpers/RequestError";
import newArticleSchema from "@/pages/helpers/validation";
import { validatedAsyncWrapper } from "@/pages/middleware/validationMiddleware";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req;
  const id = query.productId;

  switch (method) {
    case "GET":
      const article = await getArticleById(String(id));
      if (!article) {
        return RequestError(res, 404, "Not found");
      }
      return res.status(200).json({ data: article });

    case "DELETE":
      const deleteResp = await removeArticle(String(id));
      if (!deleteResp) {
        return RequestError(res, 404, "Not found");
      }
      return res.status(201).json({ data: deleteResp });

    case "PUT":
      const updateResp = await updateArticle(String(id), body);
      if (!updateResp) {
        return RequestError(res, 404, "Not found");
      }
      return res.status(201).json({ data: updateResp });

    default:
      res.status(400).json({ data: "Bad Request" });
      break;
  }
}

export default validatedAsyncWrapper(newArticleSchema, handler);
