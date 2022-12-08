import { PedidoService } from "./../../services/pedido.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-pedidos",
  templateUrl: "./pedidos.page.html",
  styleUrls: ["./pedidos.page.scss"],
})
export class PedidosPage implements OnInit {
  constructor(private service: PedidoService) {}

  ocultar = false;
  detalles = [];
  ngOnInit() {
    this.listar();
  }

  listar() {
    this.service.getAll().subscribe((data) => {
      this.detalles = data.result;
      if (this.detalles.length > 0) this.ocultar = true;
      else this.ocultar = false;
      console.log(data);
    });
  }
  onClick(id) {
    this.service.update(id).subscribe((data) => {
      console.log(data);
      this.listar();
    });
  }
}
