import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-menu-principal',
  templateUrl: './nav-menu-principal.component.html',
  styleUrls: ['./nav-menu-principal.component.scss']
})
export class NavMenuPrincipalComponent implements OnInit {

  private _title: string;

  constructor() {
    this._title = 'CompteWebApp';
  }

  ngOnInit() {
  }

  public get title(): string {
    return this._title;
  }

}
