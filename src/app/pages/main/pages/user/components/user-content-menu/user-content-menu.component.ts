import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'pg-user-content-menu',
  templateUrl: './user-content-menu.component.html',
  styleUrls: ['./user-content-menu.component.scss']
})
export class UserContentMenuComponent implements OnChanges {

  @Input() userId: string;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const userIdChange = changes['userId'];
  }

}
