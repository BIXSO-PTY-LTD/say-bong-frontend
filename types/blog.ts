import { IAuthorProps } from './author';
import { ISocialLinks } from './socials';

// ----------------------------------------------------------------------
export type IBlogTableFilterValue = string | string[];

export type IBlogTableFilters = {
  title: string;
};
export type IBlogCategoryProps = {
  label: string;
  path: string;
};

export type IPostHero = {
  title: string;
  coverUrl: string;
  createdAt?: Date;
  author?: {
    name: string;
    avatarUrl: string;
  };
};

export type IBlogPostProps = {
  id: string;
  title: string;
  heroUrl: string;
  tags?: string[];
  createdAt: Date;
  category: string;
  coverUrl: string;
  duration: string;
  favorited: boolean;
  description: string;
  author: IAuthorProps;
  shareLinks?: ISocialLinks;
  content: string
};
