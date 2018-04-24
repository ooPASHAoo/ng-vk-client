import {Component, Input, OnInit} from '@angular/core';

import {VkUser} from '../../../../../core/vk-api/methods/models/vk-user.model';
import {VkGroup} from '../../../../../core/vk-api/methods/models/vk-group.model';
import {VkPost} from '../../../../../core/vk-api/methods/models/vk-post.model';
import {VkMediaPhoto} from '../../../../../core/vk-api/methods/models/vk-media-photo.model';
import {VkMedia} from '../../../../../core/vk-api/methods/models/vk-media.model.abstract';
import {VkMediaLink} from '../../../../../core/vk-api/methods/models/vk-media-link.model';
import {fadeInOutAnimation} from '../../../../../shared/animations/fade-in-out.animation';

@Component({
  selector: 'pg-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  animations: [fadeInOutAnimation]
})
export class PostComponent implements OnInit {

  @Input() post: VkPost|null;
  @Input() repostHistory: VkPost[]|null;
  @Input() relatedUsers: { [userId: string]: VkUser };
  @Input() relatedGroups: { [groupId: string]: VkGroup };

  isRepost = false;

  constructor() {
  }

  ngOnInit() {
    // Кривоватый способ отображения репостов любой вложенности
    if (!this.post && this.repostHistory) {
      this.isRepost = true;
      this.post = this.repostHistory[0];
      const subRepostHistory = this.repostHistory.slice(1);
      if (subRepostHistory.length) {
        this.post.repostHistory = subRepostHistory;
      }
    }
  }

  isPhotoOnly(): boolean {
    return this.hasAttachmentPhoto() &&
      !this.hasAttachmentLink() &&
      !this.post.text &&
      !this.post.repostHistory;
  }

  // --- author --- //

  get authorLink(): string[]|null {
    const author = this._getAuthorById(this.post.authorId);
    if (author instanceof VkUser) {
      return (author.id !== this.post.ownerId) ? ['/', author.id] : null;
    }
    return null;
  }

  get authorName(): string|null {
    const author = this._getAuthorById(this.post.authorId);
    if (author instanceof VkUser) {
      return `${author.firstName} ${author.lastName}`;
    }
    if (author instanceof VkGroup) {
      return author.name;
    }
    return null;
  }

  get authorPhoto(): string {
    const author = this._getAuthorById(this.post.authorId);
    return author ? author.photoUrl100 : null;
  }

  // --- attachments --- //

  hasAttachmentLink(): boolean {
    return this._hasAttachmentByType(VkMediaLink.typeName);
  }

  hasAttachmentPhoto(): boolean {
    return this._hasAttachmentByType(VkMediaPhoto.typeName);
  }

  getAttachmentLinks(): VkMediaLink[]|null {
    return <VkMediaLink[]|null> this._getAttachmentByType(VkMediaLink.typeName);
  }

  getAttachmentPhotos(): VkMediaPhoto[]|null {
    return <VkMediaPhoto[]|null> this._getAttachmentByType(VkMediaPhoto.typeName);
  }

  // --- private --- //

  private _getAuthorById(authorId: string): VkGroup|VkUser|undefined {
    if (authorId.search('-') !== -1) {
      return this.relatedGroups ? this.relatedGroups[authorId.replace('-', '')] : undefined;
    } else {
      return this.relatedUsers ? this.relatedUsers[authorId] : undefined;
    }
  }

  private _hasAttachmentByType(mediaType: string): boolean {
    if (!this.post.attachmentsList) {
      return false;
    }
    return this.post.attachmentsList
      .some((item: VkMedia) => item.type === mediaType);
  }

  private _getAttachmentByType(mediaType: string): VkMedia[]|null {
    if (!this.post.attachmentsList) {
      return null;
    }
    const attachmentItems = this.post.attachmentsList
      .filter((item: VkMedia) => item.type === mediaType);
    return attachmentItems.length ? attachmentItems : null;
  }

}
