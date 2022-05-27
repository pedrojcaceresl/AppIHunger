import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuListadoPage } from './menu-listado.page';

const routes: Routes = [
  {
    path: '',
    component: MenuListadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuListadoPageRoutingModule {}
