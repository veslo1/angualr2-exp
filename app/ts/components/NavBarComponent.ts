import {Component, OnInit} from 'angular2/core';
@Component({
  selector: 'nav-bar-basic',
  template: `
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand" href="https://github.com/willSonic/angular2-load-binary">
          <img src="${require('images/logos/ns-logo.png')}"/>
           ng-book 2
        </a>
      </div>
      <p class="navbar-text navbar-right">
        <button class="btn btn-primary" type="button">
          Messages <span class="badge">{{auidoLoadedCount}}</span>
        </button>
      </p>
    </div>
  </nav>
  `
})
export class NavBarBasic implements OnInit {
  auidoLoadedCount: number;

  constructor() {
  }

  ngOnInit(): void {
    this.auidoLoadedCount =0;
  }
}
