import {VkMedia} from './vk-media.model.abstract';
import {Stp} from '../../../../shared/supports/safe-type-parser';

export class VkMediaPhoto extends VkMedia {

  static readonly typeName = 'photo';
  type: string = VkMediaPhoto.typeName;

  id: string;
  owner_id: string;
  date: Date;

  text: string|null;
  url75: string|null;
  url130: string|null;
  url604: string|null;
  url807: string|null;
  url1280: string|null;
  url2560: string|null;


  /** @throws StpError */
  static parseItem(photoData: object): VkMediaPhoto {
    const stp = new Stp(photoData);
    const photo = new VkMediaPhoto();

    photo.id = stp.get(['id'], Number, true).toString();
    photo.owner_id = stp.get(['owner_id'], Number, true).toString();
    photo.date = new Date(stp.get(['date'], Number, true) * 1000);
    //
    photo.text = stp.get(['text'], String);
    photo.url75 = stp.get(['photo_75'], String);
    photo.url130 = stp.get(['photo_130'], String);
    photo.url604 = stp.get(['photo_604'], String);
    photo.url807 = stp.get(['photo_807'], String);
    photo.url1280 = stp.get(['photo_1280'], String);
    photo.url2560 = stp.get(['photo_2560'], String);

    return photo;
  }

}
