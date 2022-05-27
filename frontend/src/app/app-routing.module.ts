import { EditarUsuarioPageModule } from './admin/usuarios/editar-usuario/editar-usuario.module';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'registro-usuario',
    loadChildren: () => import('./registro-usuario/registro-usuario.module').then( m => m.RegistroUsuarioPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'admin/usuarios/editar-usuario/:id',
    loadChildren: () => import('./admin/usuarios/editar-usuario/editar-usuario.module').then( m => m.EditarUsuarioPageModule)
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./pedidos/pedidos.module').then( m => m.PedidosPageModule)
  },
  {
    path: 'menu-listado',
    loadChildren: () => import('./menu-listado/menu-listado.module').then( m => m.MenuListadoPageModule)
  },
  {
    path: 'detalle-producto',
    loadChildren: () => import('./detalle-producto/detalle-producto.module').then( m => m.DetalleProductoPageModule)
  },
  {
    path: 'continuar-finalizar-modal',
    loadChildren: () => import('./continuar-finalizar-modal/continuar-finalizar-modal.module').then( m => m.ContinuarFinalizarModalPageModule)
  },
  {
    path: 'finalizar-pedido',
    loadChildren: () => import('./finalizar-pedido/finalizar-pedido.module').then( m => m.FinalizarPedidoPageModule)
  },
  {
    path: 'success',
    loadChildren: () => import('./success/success.module').then( m => m.SuccessPageModule)
  },
  {
    path: 'admin/categorias/editar-categoria/:id',
    loadChildren: () => import('./admin/categorias/editar-categoria/editar-categoria.module').then( m => m.EditarCategoriaPageModule)
  },
 
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
