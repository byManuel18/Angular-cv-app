

export interface CvSection  {
  title: string;
  articles: CvArticle[]
}

export interface CvArticle {
  title?: string;
  subTitle?: string;
  time?: string;
  text?: string;
  url?: string;
  highlights?: string[],
}
