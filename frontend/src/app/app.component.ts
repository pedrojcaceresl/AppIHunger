import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication.service";
import { Component } from "@angular/core";

import { Platform, MenuController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/es-PY";
registerLocaleData(localeFr, "es");

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  public appPages = [
    { title: "Inicio", url: "/home", icon: "home" },
    { title: "Pedidos", url: "/pedidos", icon: "newspaper" },
    { title: "Mi cuenta", url: "/mi-cuenta", icon: "person" },
    {
      title: "Información Legal",
      url: "/informacion-legal",
      icon: "information-circle",
    },
    { title: "Ayuda en línea", url: "/folder/Ayuda en Línea", icon: "headset" },
    { title: "Admin", url: "/admin", icon: "people" },
  ];

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private menu: MenuController
  ) {}

  async logout() {
    console.log("LOGOUTT");
    await this.authService.logout();
    this.menu.close();
    this.router.navigate(["/login"]);
  }
}
