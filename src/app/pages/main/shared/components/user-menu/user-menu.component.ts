import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pg-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  dropdownShow = false;

  constructor() { }

  ngOnInit() {
  }

}
