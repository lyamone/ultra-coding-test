export type ImagesType = 'gifs' | 'stickers';

export interface ImageData {
  images: {
    fixed_width: {
      url: string;
    };
    fixed_height: {
      url: string;
    };
  };
  id: string;
  type: ImagesType;
  title: string;
}

export interface SearchRequest {
  q: string;
  offset: string;
  limit: string;
}

export interface Pagination {
  count: number;
  offset: number;
  total_count: number;
}

export interface GiphyResult {
  data: ImageData[];
  pagination: Pagination;
}
