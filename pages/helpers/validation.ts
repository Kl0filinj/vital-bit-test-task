import { object, string } from "yup";

const newArticleSchema = object({
  title: string().min(5).max(30).required(),
  description: string().min(50).max(500).required(),
});

export default newArticleSchema;
