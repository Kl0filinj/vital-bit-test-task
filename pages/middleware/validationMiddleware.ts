import { IError } from "@/types/commonTypes";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
// import { OptionalObjectSchema } from "yup/lib/object";
import RequestError from "../helpers/RequestError";

export function validatedAsyncWrapper(schema: any, handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      if (req.method === "POST" || req.method === "PUT") {
        await schema.validate(req.body);
      }
      return await handler(req, res);
    } catch (error: any) {
      return RequestError(res, 400, error.message);
    }
  };
}
