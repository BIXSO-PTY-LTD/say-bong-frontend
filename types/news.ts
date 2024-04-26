export type INewsMetas = {
  id: string;
  key: string;
  content: string;
};
export type INewsItem = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  images: string[];
  meta: INewsMetas[];
};