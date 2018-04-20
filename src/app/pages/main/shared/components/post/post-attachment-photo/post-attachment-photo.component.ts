import {Component, Input, OnInit} from '@angular/core';
import {VkMediaPhoto} from '../../../../../../core/vk-api/methods/models/vk-media-photo.model';

@Component({
  selector: 'pg-post-attachment-photo',
  templateUrl: './post-attachment-photo.component.html',
  styleUrls: ['./post-attachment-photo.component.scss']
})
export class PostAttachmentPhotoComponent implements OnInit {

  @Input() attachmentPhotos: VkMediaPhoto[];

  constructor() { }

  ngOnInit() {
  }

}
