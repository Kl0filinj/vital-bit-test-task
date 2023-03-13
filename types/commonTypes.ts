export interface IArticle {
  id?: string;
  title: string;
  poster?: string;
  description: string;
}

export interface IError {
  message: string;
  status?: number;
}
