import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';


@Component({
  selector: 'pg-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private _title: Title) {
    this._title.setTitle('Авторизация');
  }

  ngOnInit() {
  }
}
