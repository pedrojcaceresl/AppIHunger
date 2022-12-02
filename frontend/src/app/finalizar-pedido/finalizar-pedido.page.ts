import { FormasPagoService } from "./../services/formas-pago.service";
import { ComprobanteService } from "./../services/comprobante.service";
import { AlertController } from "@ionic/angular";
import { LocalStorageService } from "./../services/localStorage.service";
import { PedidoService } from "./../services/pedido.service";
import { Detalle } from "./../interfaces/Detalle";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-finalizar-pedido",
  templateUrl: "./finalizar-pedido.page.html",
  styleUrls: ["./finalizar-pedido.page.scss"],
})
export class FinalizarPedidoPage implements OnInit {
  constructor(
    private pedidoService: PedidoService,
    private localStorageService: LocalStorageService,
    private alertController: AlertController,
    private comprobanteService: ComprobanteService,
    private pagoService: FormasPagoService
  ) {}
  cart;
  cartResult;
  comprobantes;
  binding;
  paymentMethod;
  paymentBinding;
  products = Array<Detalle>();
  totalGeneral = 0;
  cantidadGeneral = 0;
  gps;
  error = false;

  ngOnInit() {
    this.getCartItems();
    this.getProductsList();
    this.getComprobantes();
    this.getPaymentsMethods();
    this.askLocation();
  }

  getProductsList() {
    this.products = this.pedidoService.getDetalles();
  }

  getComprobantes() {
    this.comprobanteService.get().subscribe((data) => {
      this.comprobantes = data.result;
      this.binding = this.comprobantes.com_id;
    });
  }

  generateHeader() {
    let data = {
      gps: this.gps || "",
      comprobanteId: this.binding,
      formaPagoId: this.paymentBinding,
    };
    this.pedidoService.generarCabecera(data);
  }

  sendOrder() {
    this.generateHeader();
    this.pedidoService.sendPedido();
  }

  getPaymentsMethods() {
    this.pagoService.get().subscribe((data) => {
      this.paymentMethod = data.result;
      this.paymentBinding = this.paymentMethod[0].fp_Id;
    });
  }

  // getting coordinates
  coords = (position) => {
    this.gps = `${position.coords.latitute},${position.coords.longitude}`;
    console.log(position.coords.latitude, position.coords.longitude);
  };

  //function to get cart items from local storage
  getCartItems() {
    let valuesFromStrg = this.localStorageService.getJSON("Totalpedido");
    this.totalGeneral = Number(valuesFromStrg.TotalPedido);
    this.cantidadGeneral = Number(valuesFromStrg.CantidadTotal);
  }

  askLocation() {
    if (!this.error) {
      navigator.geolocation.getCurrentPosition(this.coords, this.errorHandler);
    }
  }

  errorHandler = () => {
    this.presentAlert(
      "Error",
      "Mensaje importante",
      "No se ha podido acceder a la ubicación",
      ["OK"]
    );
    this.error = true;
  };

  async presentAlert(
    head: string,
    subHead: string,
    msg: string,
    btns: Array<any>
  ) {
    const alert = await this.alertController.create({
      header: head,
      subHeader: subHead,
      message: msg,
      buttons: btns,
    });
    await alert.present();
  }
}
