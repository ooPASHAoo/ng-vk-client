import {Component, Input, OnInit} from '@angular/core';
import {MediaPhotoModel} from '../../../../../core/vk-api/methods/models/media-photo.model';

@Component({
  selector: 'pg-post-attachment-photo',
  templateUrl: './post-attachment-photo.component.html',
  styleUrls: ['./post-attachment-photo.component.scss']
})
export class PostAttachmentPhotoComponent implements OnInit {

  @Input() attachmentPhoto: MediaPhotoModel;

  constructor() { }

  ngOnInit() {
  }

}
