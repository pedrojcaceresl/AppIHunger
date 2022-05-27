import { ProductoService } from './../services/producto.service';
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
    private storage: LocalStorageService,
    private actionSheetCtrl: ActionSheetController,
    private router: Router,
    private productoService: ProductoService
  ) {}
  bandera = false;
  productosResult
  ngOnInit() {}

  onClick() {
    let obej: {
      productoId: 1;
      precio: 30000;
      totalParcial: 30000;
      cantidad: 1;
      iva: 0;
      totalGeneral: 30000;
      ivaPorcent: 0;
      estado: 2;
      obs: "Sin tomate";
    };
    this.guardarAlCarrito(obej);

    this.bandera = true;
    console.log(this.bandera);
    return (this.bandera = true);
  }



  public guardarAlCarrito(object) {
    var a = {
      clinteId: 1,
      fecha: "2022/07/25",
      comprobanteId: 1,
      totalParcial: 0,
      iva: 0,
      totalGeneral: 0,
      estado: 1,
      gpsX: "0",
      gpsY: "0",
      detalles: [],
    };

    let totalGeneral = 0;
    let totalIva = 0;
    let totalParcial = 0;
    object.forEach((element) => {
      element.totalParcial = element.precio * element.cantidad;
      element.iva = element.totalParcial * (element.ivaPorcent / 100);
      element.totalGeneral = element.totalParcial + element.iva;
      totalGeneral += element.totalGeneral;
      totalParcial += element.totalParcial;
      totalIva += element.iva;
    });
    a.detalles.push(object);
    a.totalGeneral += totalGeneral;
    a.totalParcial += totalParcial;
    a.iva += totalIva;

    this.storage.setItem("carrito", object);
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

  getProductos() {
    this.productoService.get().subscribe((data) => {
      this.productosResult = data.result;
      console.log(this.productosResult);
    });
  }
}
