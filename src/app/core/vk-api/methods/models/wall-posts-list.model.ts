import {User} from './user.model';
import {Group} from './group.model';
import {WallPost} from './wall-post.model';

export class WallPostsList {

  posts: WallPost[];
  relatedUsers: { [userId: string]: User };
  relatedGroups: { [groupId: string]: Group };

  static parseItem(postsListData: object): WallPostsList|null {
    const wallPostsList = new WallPostsList();

    const postItemsList: Array<object>|null = postsListData['items'];
    if (!postItemsList) {
      throw new Error('Wall posts items is empty');
    }
    const postsList = postItemsList.map(WallPost.parseItem).filter(Boolean);
    if (!postsList) {
      throw new Error('Wall posts is empty');
    }
    wallPostsList.posts = postsList;

    const groupItemsList: Array<object>|null = postsListData['groups'];
    if (groupItemsList) {
      const groupsList = groupItemsList.map(Group.parseItem).filter(Boolean);
      if (groupsList) {
        wallPostsList.relatedGroups = {};
        groupsList.forEach((iGroup: Group) => {
          wallPostsList.relatedGroups[iGroup.id] = iGroup;
        });
      }
    }

    const userItemsList: Array<object>|null = postsListData['profiles'];
    if (userItemsList) {
      const usersList = userItemsList.map(User.parseResponse).filter(Boolean);
      if (usersList) {
        wallPostsList.relatedUsers = {};
        usersList.forEach((iUser: User) => {
          wallPostsList.relatedUsers[iUser.id] = iUser;
        });
      }
    }

    return wallPostsList;
  }
}
