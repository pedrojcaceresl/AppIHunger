import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagosCreatePage } from './pagos-create.page';

const routes: Routes = [
  {
    path: '',
    component: PagosCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagosCreatePageRoutingModule {}
