export type INewsMetas = {
  key: string;
  content?: string;
};
export type INewsItem = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  images: string[];
};