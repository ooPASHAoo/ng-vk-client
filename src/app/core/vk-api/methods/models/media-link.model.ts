import * as stg from '../../../../shared/supports/safe-type-getter';
import {MediaPhotoModel} from './media-photo.model';

export class MediaLinkModel {

  static typeName = 'link';
  type: string = MediaLinkModel.typeName;

  url: string;
  title: string;
  caption?: string;
  description: string;
  photo?: MediaPhotoModel;
  previewUrl: string;

  static parseItem(linkData: object): MediaLinkModel|null {
    if (!stg.isObj(linkData)) {
      return null;
    }

    const link = new MediaLinkModel();
    link.url = stg.getIsHas(linkData, ['url'], stg.eType.String);
    link.title = stg.getIsHas(linkData, ['title'], stg.eType.String);
    link.caption = stg.getIsHas(linkData, ['caption'], stg.eType.String);
    link.description = stg.getIsHas(linkData, ['description'], stg.eType.String);
    link.previewUrl = stg.getIsHas(linkData, ['preview_url'], stg.eType.String);
    const photoItem = stg.getIsHas(linkData, ['photo'], stg.eType.Object);
    if (photoItem) {
      const photo = MediaPhotoModel.parseItem(photoItem);
      if (photo) {
        link.photo = photo;
      }
    }

    return link;
  }
}

