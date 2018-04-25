import {Stp} from '../../../../shared/supports/safe-type-parser';
import {VkUser} from './vk-user.model';
import {VkGroup} from './vk-group.model';
import {VkPost} from './vk-post.model';


export class VkPostsList {

  posts: VkPost[];
  maxCount: number;
  relatedUsers: {[userId: string]: VkUser}|null;
  relatedGroups: {[groupId: string]: VkGroup}|null;


  /** @throws StpError */
  static parseItem(postsListData: object): VkPostsList {
    const stp = new Stp(postsListData);
    const postsList = new VkPostsList();

    postsList.posts = stp.get(['items'], Array, true).map(VkPost.parseItem);
    postsList.maxCount = stp.get(['count'], Number, true);

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

  static assign(target: VkPostsList, source: VkPostsList) {
    target.maxCount = source.maxCount;
    target.posts.push(...source.posts);
    Object.assign(target.relatedUsers, source.relatedUsers);
    Object.assign(target.relatedGroups, source.relatedGroups);
  }

}
