import {
    PageObjectResponse,
    PartialPageObjectResponse,
    QueryDatabaseResponse,
  } from '@notionhq/client/build/src/api-endpoints';
  
  export type NotionPage = PageObjectResponse | PartialPageObjectResponse;
  
  export interface NotionPageProperties {
    Name: {
      title: Array<{
        plain_text: string;
      }>;
    };
    Description?: {
      rich_text: Array<{
        plain_text: string;
      }>;
    };
    // Add other properties you use in your Notion database
  }
  
  export type NotionPageWithCustomProperties = Omit<NotionPage, 'properties'> & {
    properties: NotionPageProperties;
  };
  
  export interface NotionBlock {
    id: string;
    type: string;
    // Add all block types you need to support
    [key: string]: any;
  }