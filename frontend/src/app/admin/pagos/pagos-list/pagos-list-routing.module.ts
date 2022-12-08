import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagosListPage } from './pagos-list.page';

const routes: Routes = [
  {
    path: '',
    component: PagosListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagosListPageRoutingModule {}
