export type ILivestreamMetas = {
  id: string;
  key: string;
  content: string;
};
export type ILivestreamItem = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  video: string;
  meta: ILivestreamMetas[];
};