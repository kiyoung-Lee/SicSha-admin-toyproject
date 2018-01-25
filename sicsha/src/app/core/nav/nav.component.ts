import {Component, Inject, OnInit} from '@angular/core';
import {IAppConfig} from "../../config/iapp.config";
import {APP_CONFIG, AppConfig} from "../../config/app.config";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent  {
  appConfig: any;
  menuItems: any[];

  constructor(@Inject(APP_CONFIG) appConfig: IAppConfig) {
    this.appConfig = appConfig;
    this.loadMenus();
  }

  private loadMenus(): void {
      this.menuItems = [
        {link: '/', name: 'home'}
      ];

  }
}
