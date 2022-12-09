import { UsuarioService } from "./services/usuario.service";
import { CarritoService } from "./services/carrito.service";
import { LocalStorageService } from "./services/localStorage.service";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication.service";
import { Component, OnInit } from "@angular/core";

import { Platform, MenuController } from "@ionic/angular";
// import { SplashScreen } from "@ionic-native/splash-screen/ngx";
// import { StatusBar } from "@ionic-native/status-bar/ngx";
import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/es-PY";
registerLocaleData(localeFr, "es");

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
  env;
  usuario;
  utl;
  rol;

  public appPages = [
    { title: "Inicio", url: "/home", icon: "home", rol: false },
    { title: "Pedidos", url: "/pedidos", icon: "newspaper", rol: false },
    { title: "Mi cuenta", url: "/mi-cuenta", icon: "person", rol: false },
    {
      title: "Información Legal",
      url: "/informacion-legal",
      icon: "information-circle",
      rol: false,
    },
    { title: "Ayuda en línea", url: "/folder/Ayuda en Línea", icon: "headset" },
    { title: "Admin", url: "/admin", icon: "people" },
  ];

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private menu: MenuController,
    private localStorageService: LocalStorageService,
    private carritoService: CarritoService,
    private usuarioService: UsuarioService
  ) {
    this.utl = window.location.href.includes("/login") ? false : true;

    this.usuario = localStorageService.getJSON("datosUsuario");
    this.usuarioService.admin.subscribe((data) => {
      this.rol = data;
      console.log("EL ROLLLLLL", this.rol);
    });
  }

  ngOnInit(): void {
    this.carritoService.datos.subscribe((data) => {
      this.env = data;
    });
    console.log("EL USUARIOOO ", this.usuario);
  }

  async logout() {
    console.log("LOGOUTT");
    this.authService.logout();
    this.localStorageService.clear();
    this.carritoService.datos.emit(false);
    this.menu.close();
    this.router.navigate(["/login"]);
  }
}
