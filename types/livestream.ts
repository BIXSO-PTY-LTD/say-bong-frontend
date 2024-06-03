export type ILivestreamFilterValue = string | string[] | Date | null;

export type ILivestreamFilters = {
  league_title: string;
  process: string;
  startDate: Date | null,
  endDate: Date | null,
  localTeam: string,
  visitorTeam: string,
  videoSource: string,
  live: string,
  hot: string
};

export type ILivestreamMetas = {
  key?: string;
  content?: string;
};
export type ILivestreamItem = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  video: string;
  metas?: ILivestreamMetas[];
  meta?: ILivestreamMetas[];
};
export type ILivestreamBroadcoaster = {
  name: string;
  link: string;
};