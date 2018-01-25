import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MenuRegistComponent} from './admin/menu-regist/menu-regist.component';
import {AppConfig} from './config/app.config';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '', component: MenuRegistComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
