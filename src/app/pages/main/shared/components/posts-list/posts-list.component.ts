import {Component, Input, OnInit} from '@angular/core';

import {VkPostsList} from '../../../../../core/vk-api/methods/models/vk-posts-list.model';

@Component({
  selector: 'pg-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  @Input() postsList: VkPostsList;

  constructor() {
  }

  ngOnInit() {
  }

}
