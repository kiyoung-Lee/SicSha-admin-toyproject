import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MenuRegistComponent} from './menu-regist/menu-regist.component';
import {AdminComponent} from './admin.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {path: '', component: MenuRegistComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AdminRoutingModule {
}
