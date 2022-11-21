import { Detalle } from "./../interfaces/Detalle";
import { Router } from "@angular/router";
import { CategoriaService } from "./../services/categoria.service";
import { PedidoService } from "./../services/pedido.service";
import { CarritoService } from "./../services/carrito.service";
import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-carrito",
  templateUrl: "./carrito.page.html",
  styleUrls: ["./carrito.page.scss"],
})
export class CarritoPage implements OnInit {
  constructor(
    private carritoService: CarritoService,
    private pedidoService: PedidoService,
    private categoriaService: CategoriaService,
    private router: Router,
    private navCtrl: NavController
  ) {}

  switch = false;
  productos = new Array<Detalle>();
  categorias = [];

  totalValues;
  totalAmount;
  dataFromStorage;
  ngOnInit() {
    this.getProductos();
    this.dataFromStorage = JSON.parse(localStorage.getItem("Totalpedido"));
    this.totalValues = this.dataFromStorage?.TotalPedido || 0;
    this.totalAmount = this.dataFromStorage?.CantidadTotal || 0;
    this.carritoService.updateCarritoStatus(false);
  }

  getProductos() {
    this.productos = this.pedidoService.getDetalles() || [];
  }

  goForward() {
    this.navCtrl.navigateForward("/finalizar-pedido");
    console.log("Se ha finalizado el pedido");
  }
}
