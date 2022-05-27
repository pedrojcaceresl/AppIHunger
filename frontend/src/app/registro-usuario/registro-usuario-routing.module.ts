import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroUsuarioPage } from './registro-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroUsuarioPage
  },
  {
    path: 'usuario-creado',
    loadChildren: () => import('./usuario-creado/usuario-creado.module').then( m => m.UsuarioCreadoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroUsuarioPageRoutingModule {}
