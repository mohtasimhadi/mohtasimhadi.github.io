export interface Blogs {
    title: string;
    description: string;
    authors?: string[];
    media: string;
    type: string;
    notion: string;
    links?: { title: string; url: string }[];
  }