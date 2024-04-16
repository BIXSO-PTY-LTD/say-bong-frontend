export type IVideoMetas = {
  id: string;
  key: string;
  content: string;
  createdAt: Date;
};
export type IVideoItem = {
  id: string;
  title: string;
  content: string
  video: string
  meta: IVideoMetas[];
};