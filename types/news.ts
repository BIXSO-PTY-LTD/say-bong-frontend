export type INewsMetas = {
  id: string;
  key: string;
  content: string;
};
export type INewsItem = {
  id: string;
  title: string;
  description: string
  createdAt: Date;
  meta: INewsMetas[];
};