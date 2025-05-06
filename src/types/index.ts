import { NotionAPI } from "notion-client";

export const notion = new NotionAPI()

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

export interface Subpage {
  page: string;
  subpage: string;
  dataType: string;
  json: string;
}
