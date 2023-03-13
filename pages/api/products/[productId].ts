import { getArticleById } from "@/pages/controllers/productsControllers";
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
      break;

    case "PUT":
      break;

    default:
      break;
  }
}

export default validatedAsyncWrapper(newArticleSchema, handler);
