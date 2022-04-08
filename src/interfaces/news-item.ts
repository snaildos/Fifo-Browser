export interface INewsItem {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  color: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}