import { object, string } from "yup";

const newArticleSchema = object({
  title: string().min(5).max(20).required(),
  description: string().min(50).max(200).required(),
});

export default newArticleSchema;
