import { Producto } from "./../interfaces/Producto";
import { ProductoService } from "./../services/producto.service";
import { LocalStorageService } from "./../services/localStorage.service";
import { Router } from "@angular/router";
import { ActionSheetController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-menu-listado",
  templateUrl: "./menu-listado.page.html",
  styleUrls: ["./menu-listado.page.scss"],
})
export class MenuListadoPage implements OnInit {
  constructor(
    private actionSheetCtrl: ActionSheetController,
    private router: Router,
    private productoService: ProductoService
  ) {}
  switch = false;
  totalValues;
  productos = new Array<Producto>();
  currentId;

  ngOnInit() {
    this.getProductos();
  }

  getProductos() {
    this.productoService.get().subscribe((data) => {
      this.productos = data.result;
      console.log(this.productos);
    });
  }

  getCategorias() {}

  onClick() {
    return (this.switch = true);
  }

  async openModal() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: "Finalizar o continuar",
      buttons: [
        {
          text: "Finalizar Pedido",
          role: "destructive",
        },
        {
          text: "Continuar comprando",
          role: "cancel",
        },
      ],
    });

    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();

    if (role === "destructive") {
      this.router.navigateByUrl("/finalizar-pedido");
      return true;
    }

    return false;
  }
}
