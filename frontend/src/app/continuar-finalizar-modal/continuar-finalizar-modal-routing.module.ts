import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContinuarFinalizarModalPage } from './continuar-finalizar-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ContinuarFinalizarModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContinuarFinalizarModalPageRoutingModule {}
