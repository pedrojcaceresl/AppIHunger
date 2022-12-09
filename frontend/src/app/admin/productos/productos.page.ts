import { AlertController } from "@ionic/angular";
import { ProductoService } from "./../../services/producto.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-productos",
  templateUrl: "./productos.page.html",
  styleUrls: ["./productos.page.scss"],
})
export class ProductosPage implements OnInit {
  productos;
  roleMessage;
  handlerMessage;

  constructor(
    public productoService: ProductoService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.listarProductos();
  }

  ionViewWillEnter() {
    this.listarProductos();
  }

  public listarProductos() {
    this.productoService.get().subscribe((data) => {
      this.productos = data.result;
      console.log("PRODUCTOOO", this.productos);
    });
  }

  buscarProducto(event) {
    let val = event.target.value;
    if (val && val.trim() != "") {
      this.productoService.filtrarProducto(val).subscribe((res) => {
        this.productos = res.result;
        this.productos = this.productos.filter((item) => {
          return item.cat_nombre.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
      });
    } else {
      this.listarProductos();
    }
  }

  async presentDialog(text) {
    const alert = await this.alertController.create({
      header: `${text}`,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            this.handlerMessage = "Alert canceled";
          },
        },
        {
          text: "OK",
          role: "ok",
          handler: () => {
            this.handlerMessage = "Alert confirmed";
          },
        },
      ],
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();

    this.roleMessage = role;
  }

  async eliminarProducto(producto) {
    this.productoService.delete(producto).subscribe();
    await this.presentDialog("Seguro que quieres eliminar?");
    if (this.roleMessage === "ok") {
      this.productoService.delete(producto).subscribe(() => {
        this.listarProductos();
      });
    } else if (this.roleMessage === "cancel") {
      this.listarProductos();
    }
  }
}
