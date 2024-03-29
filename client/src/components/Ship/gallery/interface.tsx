export interface GalleryProps {
  id: string;
  ccid: string;
  gallery_data: GalleryData[] | 'no data';
  setGalleryData: any;
  setLoaded: any;
}

export interface GalleryData {
  name: string;
  list: Array<List>;
}

export interface List {
  id: number;
  name: string;
  totalMedia: number;
  coverImage: CoverImage;
  state?: any;
  setState?: any;
}

export interface CoverImage {
  id: number;
  format: string;
}
