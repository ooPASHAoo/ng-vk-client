import {Component, Input, OnInit} from '@angular/core';

import {WallPost} from '../../../../../../../../core/vk-api/methods/models/wall-post.model';
import {MediaPhotoModel} from '../../../../../../../../core/vk-api/methods/models/media-photo.model';
import {MediaLinkModel} from '../../../../../../../../core/vk-api/methods/models/media-link.model';

@Component({
  selector: 'pg-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post: WallPost;

  constructor() {
  }

  ngOnInit() {
  }

  asPhoto(v): MediaPhotoModel {
    return v;
  }

  asLink(v): MediaLinkModel {
    return v;
  }

  onLog(obj: any) {
    console.log('- PG:', obj);
  }

}
