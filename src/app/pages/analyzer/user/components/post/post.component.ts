import {Component, Input, OnInit} from '@angular/core';

import {WallPost} from '../../../../../core/vk-api/methods/models/wall-post.model';
import {User} from '../../../../../core/vk-api/methods/models/user.model';
import {Group} from '../../../../../core/vk-api/methods/models/group.model';

@Component({
  selector: 'pg-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post: WallPost;
  @Input() relatedUsers: { [userId: string]: User };
  @Input() relatedGroups: { [groupId: string]: Group };

  @Input() isRepost = false;

  constructor() {
  }

  ngOnInit() {
  }

  onLog(obj: any) {
    console.log('- PG:', obj);
  }

  getAuthorPhoto() {
    const authorId = this.post.authorId;
    if (authorId.search('-') !== -1) {
      const group = this.relatedGroups[authorId.replace('-', '')];
      return group.photoUrl100;
    } else {
      const user = this.relatedUsers[authorId];
      return user.photoUrl100;
    }
  }

  getAuthorName() {
    const authorId = this.post.authorId;
    if (authorId.search('-') !== -1) {
      const group = this.relatedGroups[authorId.replace('-', '')];
      return group.name;
    } else {
      const user = this.relatedUsers[authorId];
      return user.firstName + ' ' + user.lastName;
    }
  }

  hasBodyContent() {
    if (this.post.attachment) {
      if (this.post.attachment.type === 'link') {
        return true;
      }
    }

    return this.post.text || this.post.originalPost;
  }

}
