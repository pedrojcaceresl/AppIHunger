import { IntroGuard } from "./../guards/intro.guard";
import { AutoLoginGuard } from "./../guards/auto-login.guard";
import { AuthGuard } from "./../guards/auth.guard";

import { EditarUsuarioPageModule } from "./admin/usuarios/editar-usuario/editar-usuario.module";
import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },
  {
    path: "folder/:id",
    loadChildren: () =>
      import("./folder/folder.module").then((m) => m.FolderPageModule),
  },
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
    canLoad: [AuthGuard],
  },
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginPageModule),
    canLoad: [IntroGuard, AutoLoginGuard],
  },
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
    canLoad: [AuthGuard],
  },
  {
    path: "registro-usuario",
    loadChildren: () =>
      import("./registro-usuario/registro-usuario.module").then(
        (m) => m.RegistroUsuarioPageModule
      ),
  },
  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: "pedidos",
    loadChildren: () =>
      import("./pedidos/pedidos.module").then((m) => m.PedidosPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: "menu-listado",
    loadChildren: () =>
      import("./menu-listado/menu-listado.module").then(
        (m) => m.MenuListadoPageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: "menu-listado/:categoriaId",
    loadChildren: () =>
      import("./menu-listado/menu-listado.module").then(
        (m) => m.MenuListadoPageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: "detalle-producto/:id",
    loadChildren: () =>
      import("./detalle-producto/detalle-producto.module").then(
        (m) => m.DetalleProductoPageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: "continuar-finalizar-modal",
    loadChildren: () =>
      import(
        "./continuar-finalizar-modal/continuar-finalizar-modal.module"
      ).then((m) => m.ContinuarFinalizarModalPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: "finalizar-pedido",
    loadChildren: () =>
      import("./finalizar-pedido/finalizar-pedido.module").then(
        (m) => m.FinalizarPedidoPageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: "success",
    loadChildren: () =>
      import("./success/success.module").then((m) => m.SuccessPageModule),
    canLoad: [AuthGuard],
  },

  {
    path: "admin/categorias/editar-categoria/:id",
    loadChildren: () =>
      import(
        "./admin/categorias/editar-categoria/editar-categoria.module"
      ).then((m) => m.EditarCategoriaPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: "carrito",
    loadChildren: () =>
      import("./carrito/carrito.module").then((m) => m.CarritoPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: "mi-cuenta",
    loadChildren: () =>
      import("./mi-cuenta/mi-cuenta.module").then((m) => m.MiCuentaPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: "informacion-legal",
    loadChildren: () =>
      import("./informacion-legal/informacion-legal.module").then(
        (m) => m.InformacionLegalPageModule
      ),
    canLoad: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
