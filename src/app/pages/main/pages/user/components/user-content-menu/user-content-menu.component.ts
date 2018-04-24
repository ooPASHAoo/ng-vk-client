import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {fadeInOutAnimation} from '../../../../../../shared/animations/fade-in-out.animation';

@Component({
  selector: 'pg-user-content-menu',
  templateUrl: './user-content-menu.component.html',
  styleUrls: ['./user-content-menu.component.scss'],
  animations: [fadeInOutAnimation]
})
export class UserContentMenuComponent implements OnChanges {

  @Input() userId: string;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const userIdChange = changes['userId'];
  }

}
