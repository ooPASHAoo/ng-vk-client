import {VkUser} from './vk-user.model';
import {VkGroup} from './vk-group.model';
import {VkPost} from './vk-post.model';
import {Stp} from '../../../../shared/supports/safe-type-parser';

export class VkPostsList {

  posts: VkPost[];
  relatedUsers: { [userId: string]: VkUser }|null;
  relatedGroups: { [groupId: string]: VkGroup }|null;


  /** @throws StpError */
  static parseItem(postsListData: object): VkPostsList {
    const stp = new Stp(postsListData);
    const postsList = new VkPostsList();

    postsList.posts = stp.get(['items'], Array, true).map(VkPost.parseItem);

    const groupItemsList: Array<object>|null = stp.get(['groups'], Array);
    if (groupItemsList) {
      postsList.relatedGroups = {};
      groupItemsList.forEach((iGroupItem: object) => {
        const group = VkGroup.parseItem(iGroupItem);
        postsList.relatedGroups[group.id] = group;
      });
    }

    const userItemsList: Array<object>|null = stp.get(['profiles'], Array);
    if (userItemsList) {
      postsList.relatedUsers = {};
      userItemsList.forEach((iUserItem: object) => {
        const user = VkUser.parseItem(iUserItem);
        postsList.relatedUsers[user.id] = user;
      });
    }

    return postsList;
  }

}
