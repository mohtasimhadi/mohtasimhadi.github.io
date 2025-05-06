export interface Blogs {
    title: string;
    description: string;
    authors?: string[];
    keywords?: string[];
    date?: string;
    media: string;
    type: string;
    notion: string;
    links?: { title: string; url: string }[];
  }