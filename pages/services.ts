import { IArticle } from "@/types/commonTypes";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/";

const instance = axios.create({
  baseURL: BASE_URL,
});

export const getAllArticles = async (): Promise<IArticle[]> => {
  const { data } = await instance.get("products");
  return data.data;
};

export const addArticle = async (article: IArticle): Promise<IArticle> => {
  const { data } = await instance.post(`products`, article);
  console.log("LOG FROM SERVICES ", data.data);
  return data.data;
};

export const removeArticle = async (id: string): Promise<string> => {
  const { data } = await instance.delete(`products/${id}`);
  return data.data;
};

export const updateArticle = async (
  article: IArticle,
  id: string
): Promise<IArticle> => {
  const { data } = await instance.put(`products/${id}`, article);
  return data.data;
};
