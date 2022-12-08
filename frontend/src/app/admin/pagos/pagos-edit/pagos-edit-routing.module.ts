import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagosEditPage } from './pagos-edit.page';

const routes: Routes = [
  {
    path: '',
    component: PagosEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagosEditPageRoutingModule {}
