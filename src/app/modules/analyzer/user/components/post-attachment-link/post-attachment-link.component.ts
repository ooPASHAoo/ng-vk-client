import {Component, Input, OnInit} from '@angular/core';
import {MediaLinkModel} from '../../../../../core/vk-api/methods/models/media-link.model';

@Component({
  selector: 'pg-post-attachment-link',
  templateUrl: './post-attachment-link.component.html',
  styleUrls: ['./post-attachment-link.component.scss']
})
export class PostAttachmentLinkComponent implements OnInit {

  @Input() attachmentLink: MediaLinkModel;

  constructor() { }

  ngOnInit() {
  }

}
