import * as stg from '../../../../shared/supports/safe-type-getter';

export class MediaPhotoModel {

  static typeName = 'photo';
  type: string = MediaPhotoModel.typeName;

  id: string;
  owner_id: string;
  date: Date;
  text: string;
  url75: string;
  url130: string;
  url604: string;
  url807: string;
  url1280: string;
  url2560: string;

  static parseItem(photoData: object): MediaPhotoModel|null {
    if (!stg.isObj(photoData)) {
      return null;
    }

    const photo = new MediaPhotoModel();
    photo.id = stg.getIsHas(photoData, ['id'], stg.eType.Number).toString();
    photo.owner_id = stg.getIsHas(photoData, ['owner_id'], stg.eType.Number).toString();
    photo.text = stg.getIsHas(photoData, ['text'], stg.eType.String);
    const dateTimestamp = stg.getIsHas(photoData, ['date'], stg.eType.Number);
    if (dateTimestamp) {
      const date = new Date(dateTimestamp);
      if (!isNaN(date.getTime())) {
        photo.date = date;
      }
    }

    photo.url75 = stg.getIsHas(photoData, ['photo_75'], stg.eType.String);
    photo.url130 = stg.getIsHas(photoData, ['photo_130'], stg.eType.String);
    photo.url604 = stg.getIsHas(photoData, ['photo_604'], stg.eType.String);
    photo.url807 = stg.getIsHas(photoData, ['photo_807'], stg.eType.String);
    photo.url1280 = stg.getIsHas(photoData, ['photo_1280'], stg.eType.String);
    photo.url2560 = stg.getIsHas(photoData, ['photo_2560'], stg.eType.String);

    return photo;
  }
}

