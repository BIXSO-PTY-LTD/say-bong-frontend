export type ILivestreamMetas = {
  key: string;
  content?: string;
};
export type ILivestreamItem = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  video: string;
  metas: ILivestreamMetas[];
  meta: ILivestreamMetas[];
};