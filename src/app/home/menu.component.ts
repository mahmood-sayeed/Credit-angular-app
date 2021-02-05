import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'pm-menu',
    templateUrl: './menu.component.html'
  })
  export class MenuComponent implements OnInit{
    pageTitle = 'Credit App';

    constructor() { }

  ngOnInit() {
  }

}