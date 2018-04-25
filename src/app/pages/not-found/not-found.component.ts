import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';


@Component({
  selector: 'pg-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

  constructor(private _title: Title) {
    this._title.setTitle('Страница не найдена');
  }

}
