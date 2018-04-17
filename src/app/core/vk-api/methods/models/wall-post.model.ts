import * as stg from '../../../../shared/supports/safe-type-getter';
import {MediaPhotoModel} from './media-photo.model';
import {MediaLinkModel} from './media-link.model';

export class WallPost {

  id: string;
  authorId: string;
  ownerId: string;
  date: Date;
  text: string;

  likesCount: number;
  isCanLikes: boolean;
  viewsCount: number;
  commentsCount: number;
  repostsCount: number;

  attachment: MediaPhotoModel|MediaLinkModel|null;

  originalPost: WallPost|null;

  static parseItem(postData: object): WallPost|null {
    if (!stg.isObj(postData)) {
      return null;
    }

    const post = new WallPost();
    post.id = stg.getIsHas(postData, ['id'], stg.eType.Number).toString();
    post.authorId = stg.getIsHas(postData, ['from_id'], stg.eType.Number).toString();
    post.ownerId = stg.getIsHas(postData, ['owner_id'], stg.eType.Number).toString();
    post.likesCount = stg.getIsHas(postData, ['likes', 'count'], stg.eType.Number);
    post.isCanLikes = !!stg.getIsHas(postData, ['likes', 'can_like'], stg.eType.Number);
    post.commentsCount = stg.getIsHas(postData, ['comments', 'count'], stg.eType.Number);
    post.viewsCount = stg.getIsHas(postData, ['views', 'count'], stg.eType.Number);
    post.repostsCount = stg.getIsHas(postData, ['reposts', 'count'], stg.eType.Number);
    post.text = stg.getIsHas(postData, ['text'], stg.eType.String);
    const postDateString = stg.getIsHas(postData, ['date'], stg.eType.Number);
    if (postDateString) {
      post.date = new Date(postDateString * 1000);
    }

    const attachmentItemsList = stg.getIsHas(postData, ['attachments'], stg.eType.Array);
    if (attachmentItemsList) {
      const attachmentItem = attachmentItemsList[0];
      const attachmentType = attachmentItem['type'];
      if (attachmentType) {
        if (attachmentType === MediaPhotoModel.typeName) {
          post.attachment = MediaPhotoModel.parseItem(attachmentItem[attachmentType]);
        } else if (attachmentType === MediaLinkModel.typeName) {
          post.attachment = MediaLinkModel.parseItem(attachmentItem[attachmentType]);
        }
      }
    }

    const repostHistory = stg.getIsHas(postData, ['copy_history'], stg.eType.Array);
    if (repostHistory) {
      post.originalPost = WallPost.parseItem(repostHistory[0]);
    }

    return post;
  }
}
