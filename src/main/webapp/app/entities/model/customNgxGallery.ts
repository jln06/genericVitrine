import { INgxGalleryImage, NgxGalleryImage } from '@kolkov/ngx-gallery';

export interface CustomNgxGallery extends INgxGalleryImage {
  idPhoto: number;
}

export declare class CustomNgxGalleryImage extends NgxGalleryImage implements CustomNgxGallery {
  idPhoto: number;

  // @ts-ignore
  constructor(obj: CustomNgxGallery) {
    super(obj);
    this.idPhoto = obj.idPhoto;
  }
}
