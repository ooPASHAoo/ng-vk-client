import {Stp} from '../../../../shared/supports/safe-type-parser';
import {VkMedia} from './vk-media.model.abstract';
import {VkMediaPhoto} from './vk-media-photo.model';


export class VkMediaLink extends VkMedia {

  static readonly typeName = 'link';
  type: string = VkMediaLink.typeName;

  url: string;
  title: string;
  description: string;

  caption: string|null;
  photo: VkMediaPhoto|null;
  previewUrl: string|null;
  previewPage: string|null;


  /** @throws StpError */
  static parseItem(linkData: object): VkMediaLink {
    const stp = new Stp(linkData);
    const link = new VkMediaLink();

    link.url = stp.get(['url'], String, true);
    link.title = stp.get(['title'], String, true);
    link.description = stp.get(['description'], String, true);
    //
    link.previewUrl = stp.get(['preview_url'], String);
    link.previewPage = stp.get(['preview_page'], String);
    link.caption = stp.get(['caption'], String);
    const photoItem = stp.get(['photo'], Object);
    link.photo = photoItem ? VkMediaPhoto.parseItem(photoItem) : null;

    return link;
  }

}
