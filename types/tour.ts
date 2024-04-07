import { IAuthorProps } from './author';
import { ISocialLinks } from './socials';

// ----------------------------------------------------------------------
export type ITourTableFilters = {
  title: string;
};

export type ITourProps = {
  id: string;
  slug: string;
  price: number;
  heroUrl: string;
  video: string,
  createdAt: Date;
  coverUrl: string;
  location: string;
  duration: string;
  continent: string;
  priceSale: number;
  gallery: string[];
  favorited: boolean;
  services: string[];
  description: string;
  languages: string[];
  ratingNumber: number;
  totalReviews: number;
  highlights: string[];
  tourGuide: IAuthorProps;
  shareLinks: ISocialLinks;
  available: {
    start: Date;
    end: Date;
  };
  program: {
    label: string;
    text: string;
  }[];
};


