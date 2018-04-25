import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';


@Component({
  selector: 'pg-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  constructor(private _title: Title) {
    this._title.setTitle('О приложении');
  }

}
