import {Stp} from '../../../../shared/supports/safe-type-parser';
import {VkMedia} from './vk-media.model.abstract';
import {VkMediaLink} from './vk-media-link.model';
import {VkMediaPhoto} from './vk-media-photo.model';

export class VkPost {

  id: string;
  authorId: string;
  ownerId: string;
  date: Date;

  likesCount: number|null;
  isCanLikes: boolean|null;
  viewsCount: number|null;
  commentsCount: number|null;
  repostsCount: number|null;

  text: string|null;

  attachmentsList: VkMedia[]|null;
  repostHistory: VkPost[]|null;


  /** @throws StpError */
  static parseItem(postData: object): VkPost {
    const stp = new Stp(postData);
    const post = new VkPost();

    post.id = stp.get(['id'], Number, true).toString();
    post.authorId = stp.get(['from_id'], Number, true).toString();
    post.ownerId = stp.get(['owner_id'], Number, true).toString();
    post.date = new Date(stp.get(['date'], Number, true) * 1000);
    //
    post.likesCount = stp.get(['likes', 'count'], Number);
    post.isCanLikes = !!stp.get(['likes', 'can_like'], Number);
    post.commentsCount = stp.get(['comments', 'count'], Number);
    post.viewsCount = stp.get(['views', 'count'], Number);
    post.repostsCount = stp.get(['reposts', 'count'], Number);

    post.text = stp.get(['text'], String);

    const attachmentItemsList: object[]|null = stp.get(['attachments'], Array);
    if (attachmentItemsList) {
      const attachmentsList: VkMedia[] = [];

      attachmentItemsList.forEach((attachmentItem: object) => {
        const mediaType = attachmentItem['type'];
        if (mediaType === VkMediaLink.typeName) {
          attachmentsList.push(VkMediaLink.parseItem(attachmentItem[mediaType]));
        } else if (mediaType === VkMediaPhoto.typeName) {
          attachmentsList.push(VkMediaPhoto.parseItem(attachmentItem[mediaType]));
        } else {
          // console.log('Необработан медиа контент типа:', mediaType);
        }
      });

      post.attachmentsList = attachmentsList.length ? attachmentsList : null;
    }

    const repostHistory = stp.get(['copy_history'], Array);
    post.repostHistory = repostHistory ? repostHistory.map(VkPost.parseItem) : null;

    return post;
  }

}
