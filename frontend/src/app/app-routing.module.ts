import { AutoLoginGuard } from './../guards/auto-login.guard';
import { IntroGuard } from './../guards/intro.guard';
import { AuthGuard } from './../guards/auth.guard';
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
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), 
    canLoad: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canLoad: [IntroGuard, AutoLoginGuard],
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canLoad: [AuthGuard],

  },
  {
    path: 'registro-usuario',
    loadChildren: () => import('./registro-usuario/registro-usuario.module').then( m => m.RegistroUsuarioPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'admin/usuarios/editar-usuario/:id',
    loadChildren: () => import('./admin/usuarios/editar-usuario/editar-usuario.module').then( m => m.EditarUsuarioPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./pedidos/pedidos.module').then( m => m.PedidosPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'menu-listado',
    loadChildren: () => import('./menu-listado/menu-listado.module').then( m => m.MenuListadoPageModule),
    canLoad: [AuthGuard],

  },
  {
    path: 'detalle-producto',
    loadChildren: () => import('./detalle-producto/detalle-producto.module').then( m => m.DetalleProductoPageModule),
    canLoad: [AuthGuard],

  },
  {
    path: 'continuar-finalizar-modal',
    loadChildren: () => import('./continuar-finalizar-modal/continuar-finalizar-modal.module').then( m => m.ContinuarFinalizarModalPageModule),
    canLoad: [AuthGuard],
  
  },
  {
    path: 'finalizar-pedido',
    loadChildren: () => import('./finalizar-pedido/finalizar-pedido.module').then( m => m.FinalizarPedidoPageModule)
  },
  {
    path: 'success',
    loadChildren: () => import('./success/success.module').then( m => m.SuccessPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'admin/categorias/editar-categoria/:id',
    loadChildren: () => import('./admin/categorias/editar-categoria/editar-categoria.module').then( m => m.EditarCategoriaPageModule),
    canLoad: [AuthGuard],
  },
 
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
