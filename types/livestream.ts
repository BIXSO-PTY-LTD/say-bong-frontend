export type ILivestreamFilterValue = string | string[];

export type ILivestreamFilters = {
  league_title: string;
  process: string;
  startDate: Date | null,
  endDate: Date | null,
  localTeam: string,
  visitorTeam: string,
  videoSource: boolean,
  live: boolean,
  hot: boolean
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