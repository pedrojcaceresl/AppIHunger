import { AlertController } from "@ionic/angular";
import { CarritoService } from "./../../../services/carrito.service";
import { FormasPagoService } from "./../../../services/formas-pago.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-pagos-list",
  templateUrl: "./pagos-list.page.html",
  styleUrls: ["./pagos-list.page.scss"],
})
export class PagosListPage implements OnInit {
  formasDePago;
  handlerMessage = "";
  roleMessage;

  constructor(
    private formasDePagoService: FormasPagoService,
    private CarritoService: CarritoService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.listarformasDePago();
    this.CarritoService.datos.emit(false);
  }

  onBack() {
    this.CarritoService.datos.emit(true);
  }

  ionViewWillEnter() {
    this.listarformasDePago();
  }

  listarformasDePago() {
    this.formasDePagoService.get().subscribe((data) => {
      this.formasDePago = data.result;
    });
  }

  onClick(formaDePago) {
    console.log(formaDePago);
    this.eliminarUsuario(formaDePago);
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

  async eliminarUsuario(formaDePago) {
    await this.presentDialog("Seguro que quieres eliminar?");
    if (this.roleMessage === "ok") {
      console.log(formaDePago);
      this.formasDePagoService.delete(formaDePago.fp_Id).subscribe(() => {
        this.listarformasDePago();
      });
    } else if (this.roleMessage === "cancel") {
      this.listarformasDePago();
    }
  }
}
